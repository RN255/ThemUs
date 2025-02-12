const express = require("express");
const https = require("https"); // Built-in module to make HTTPS requests
const router = express.Router();

router.get("/", (req, res) => {
  // Fetch the external RSS feed (GB News) using https.get
  https
    .get("https://www.gbnews.com/feeds/news.rss", (response) => {
      let data = "";

      // Collect the data chunks
      response.on("data", (chunk) => {
        data += chunk;
      });

      // Once the data is fully received, send it back as the RSS feed
      response.on("end", () => {
        // Set the correct content type for RSS
        res.set("Content-Type", "application/rss+xml");
        res.send(data); // Send the raw XML feed directly to the user
      });
    })
    .on("error", (err) => {
      console.error("Error fetching external RSS feed:", err);
      res.status(500).send("Error fetching RSS feed");
    });
});

module.exports = router; // Export the router
