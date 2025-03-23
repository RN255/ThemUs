const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middleware to ensure user is logged in
const ensureAuth = (req, res, next) => {
  if (req.user) return next();
  return res
    .status(401)
    .json({ error: "You must be logged in to make a payment." });
};

router.post("/create-checkout-session", ensureAuth, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "ThemUs Premium Access",
              description: "Unlock all premium features",
            },
            unit_amount: 500, // £5.00 in pence
          },
          quantity: 1,
        },
      ],
      success_url: "https://www.themus.org/payment-success",
      cancel_url: "https://www.themus.org/payment-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
