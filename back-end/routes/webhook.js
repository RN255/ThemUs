const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/UserSchema");

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log(`✅ Webhook received: ${event.type}`);
    } catch (err) {
      console.error("❌ Stripe webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle subscription creation
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const sessionId = session.id;

      try {
        // Fetch full session to get the subscription ID
        const fullSession = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["subscription"],
        });

        const email = fullSession.customer_email;
        const subscriptionId = fullSession.subscription?.id;

        if (email) {
          const now = new Date();
          const renewDate = new Date(now.setMonth(now.getMonth() + 1));

          const updated = await User.findOneAndUpdate(
            { email },
            {
              plan: "premium",
              usedLetters: 0,
              letterLimit: 50,
              renewsAt: renewDate,
              subscriptionId,
            },
            { new: true }
          );

          if (updated) {
            console.log("✅ Premium plan activated for:", email);
          } else {
            console.warn("⚠️ No user found for email:", email);
          }
        }
      } catch (err) {
        console.error("❌ Failed to handle checkout completion:", err);
      }
    }

    // ✅ Handle subscription cancellation
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      try {
        const customer = await stripe.customers.retrieve(customerId);
        const email = customer.email;

        if (email) {
          await User.findOneAndUpdate(
            { email },
            {
              plan: "free",
              letterLimit: 5,
              renewsAt: null,
              subscriptionId: null,
            }
          );
          console.log(`✅ Downgraded user ${email} to free plan`);
        }
      } catch (err) {
        console.error("❌ Failed to handle subscription cancellation:", err);
      }
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      const customerId = subscription.customer; // This is a string like "cus_abc123"

      try {
        // Fetch full customer to get their email
        const customer = await stripe.customers.retrieve(customerId);
        const email = customer.email;

        if (email) {
          const cancelAtPeriodEnd = subscription.cancel_at_period_end;
          const currentPeriodEnd = subscription.current_period_end;

          await User.findOneAndUpdate(
            { email },
            {
              subscriptionStatus: cancelAtPeriodEnd ? "cancelling" : "active",
              subscriptionEndsAt: cancelAtPeriodEnd
                ? new Date(currentPeriodEnd * 1000) // convert from UNIX timestamp
                : null,
            }
          );

          console.log(
            `✅ Updated user ${email}: ${
              cancelAtPeriodEnd ? "cancelling" : "active"
            }, ends at ${new Date(currentPeriodEnd * 1000)}`
          );
        }
      } catch (err) {
        console.error("❌ Error updating user from subscription.updated", err);
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
