const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const validator = require("validator");

// POST /api/emails
router.post("/", async (req, res) => {
  const { email } = req.body;

  // ✅ Validate format
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // ✅ Check for existing
    const existing = await Email.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already signed up" });
    }

    // ✅ Save email
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(200).json({ message: "Thanks for signing up!" });
  } catch (err) {
    console.error("Error saving email:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
