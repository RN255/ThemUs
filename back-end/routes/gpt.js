const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/UserSchema");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.use((req, res, next) => {
  console.log("🌐 [GPT Router] Incoming request — req.user:", req.user);
  next();
});

router.post("/generate", requireAuth, async (req, res) => {
  console.log("🔍 Inside /generate — req.user:", req.user);
  const { prompt } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Reset quota if needed
    const now = new Date();
    if (!user.renewsAt || now > user.renewsAt) {
      user.usedLetters = 0;
      user.renewsAt = new Date(now.setMonth(now.getMonth() + 1));
    }

    // Check usage limit
    if (user.usedLetters >= user.letterLimit) {
      return res.status(403).json({
        error:
          "You have reached your monthly cover letter limit. Upgrade your plan to continue.",
      });
    }

    // Generate with OpenAI
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const responseText = chatCompletion.choices[0].message.content;

    // Update usage
    user.usedLetters += 1;
    await user.save();

    res.json({ response: responseText });
  } catch (err) {
    console.error("GPT API Error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;
