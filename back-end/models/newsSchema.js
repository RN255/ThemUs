const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  source: String,
  url: String,
  category: String,
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
