const News = require("../models/newsSchema");

// Get all news articles
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }); // Sort by latest first
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// Add a new news article
exports.addNews = async (req, res) => {
  try {
    const { title, source, url, category, publishedAt } = req.body;
    const newsArticle = new News({ title, source, url, category, publishedAt });
    await newsArticle.save();
    res.status(201).json(newsArticle);
  } catch (err) {
    res.status(400).json({ error: "Failed to add news article" });
  }
};

// Delete a news article by ID
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndDelete(id);
    res.json({ message: "News article deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete news article" });
  }
};
