const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    } catch (err) {
      console.error("❌ Stripe webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email;

      if (email) {
        try {
          const now = new Date();
          const renewDate = new Date(now.setMonth(now.getMonth() + 1));

          const updated = await User.findOneAndUpdate(
            { email },
            {
              plan: "premium",
              usedLetters: 0,
              letterLimit: 50,
              renewsAt: renewDate,
            },
            { new: true }
          );

          if (updated) {
            console.log("✅ Premium plan activated for:", email);
          } else {
            console.warn("⚠️ No user found for email:", email);
          }
        } catch (err) {
          console.error("❌ Failed to upgrade user:", err);
        }
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
