const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/UserSchema");
const requireLogin = require("../middleware/requireAuth"); // Make sure user is logged in

router.post("/", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assuming req.user is populated

    if (!user || !user.subscriptionId) {
      return res.status(400).json({ error: "No subscription found" });
    }

    // Cancel subscription at period end
    await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: true,
    });

    res.json({ message: "Subscription will be canceled at period end" });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
});

module.exports = router;
