const express = require("express");
const fetchRSS = require("./fetchRss");
const router = express.Router();

const GB_NEWS_URL = "https://www.gbnews.com/feeds/news.rss";

router.get("/", async (req, res) => {
  try {
    const data = await fetchRSS(GB_NEWS_URL);
    res.set("Content-Type", "application/rss+xml");
    res.send(data);
  } catch (error) {
    console.error("Error fetching GB News RSS:", error);
    res.status(500).send("Error fetching GB News RSS feed");
  }
});

module.exports = router;
