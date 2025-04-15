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

// GET /api/coverLetters/user/:userId
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    // 🧠 Sort embedded cover letters by createdAt DESC (newest first)
    const sortedLetters = [...user.coverLetters].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(sortedLetters);
  } catch (err) {
    console.error("Error fetching user cover letters:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
