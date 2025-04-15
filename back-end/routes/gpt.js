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
  const { cvText, jobDesc } = req.body;
  const userId = req.user._id;

  // ✅ Character limit enforcement
  const maxCvChars = 6000;
  const maxJobDescChars = 4000;

  if (!cvText || !jobDesc) {
    return res
      .status(400)
      .json({ error: "CV and job description are required." });
  }

  if (cvText.length > maxCvChars || jobDesc.length > maxJobDescChars) {
    return res.status(400).json({
      error: `CV must be under ${maxCvChars} characters and job description under ${maxJobDescChars}.`,
    });
  }

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

    // 🔐 Build the prompt securely on the backend
    const prompt = `
    Write a professional and personalised cover letter tailored to this job description, using the following CV. Use British English spelling and phrasing throughout:

    CV:
    ${cvText}

    Job Description:
    ${jobDesc}

    The tone should be formal yet enthusiastic. Keep it concise (max one page), and highlight relevant experience. End with a confident closing statement.
    `;

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
