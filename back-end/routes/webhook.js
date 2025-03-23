const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // ✅ No syntax error

// Stripe needs raw body to validate signature
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

    // ✅ Only handle successful checkout
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email;

      if (email) {
        try {
          const updated = await User.findOneAndUpdate(
            { email },
            { isPremium: true },
            { new: true }
          );
          console.log("✅ Premium status updated for:", email);
        } catch (err) {
          console.error("❌ Failed to update user:", err);
        }
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
