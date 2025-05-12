const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const validator = require("validator");

router.post("/", async (req, res) => {
  console.log("📩 POST /api/emails called");

  // ✅ Log cookies and session (if you're using sessions)
  console.log("🍪 Cookies:", req.headers.cookie);
  console.log(
    "🧑 Session user:",
    req.session?.passport?.user || "No session user"
  );

  // ✅ Log raw body
  console.log("📨 Request body:", req.body);

  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    console.log("❌ Invalid email received:", email);
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const existing = await Email.findOne({ email });
    if (existing) {
      console.log("🔁 Email already signed up:", email);
      return res.status(200).json({ message: "Already signed up" });
    }

    const newEmail = new Email({ email });
    await newEmail.save();

    console.log("✅ New email saved:", email);
    res.status(200).json({ message: "Thanks for signing up!" });
  } catch (err) {
    console.error("❌ Error saving email:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
