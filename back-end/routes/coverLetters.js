// routes/coverLetters.js
const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

// POST /api/coverLetters
router.post("/", async (req, res) => {
  const { userId, content, jobTitle, company } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.coverLetters.push({ content, jobTitle, company });
    await user.save();

    res.status(201).json({ message: "Cover letter saved!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
