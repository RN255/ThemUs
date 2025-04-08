// routes/gpt.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error('GPT API Error:', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
