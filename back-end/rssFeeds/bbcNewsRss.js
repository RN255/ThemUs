const express = require("express");
const fetchRSS = require("./fetchRss");
const router = express.Router();

const BBC_NEWS_URL = "http://feeds.bbci.co.uk/news/rss.xml";

router.get("/", async (req, res) => {
  try {
    const data = await fetchRSS(BBC_NEWS_URL);
    res.set("Content-Type", "application/rss+xml");
    res.send(data);
  } catch (error) {
    console.error("Error fetching BBC News RSS:", error);
    res.status(500).send("Error fetching BBC News RSS feed");
  }
});

module.exports = router;
