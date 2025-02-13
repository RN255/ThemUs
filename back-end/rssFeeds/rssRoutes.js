const express = require("express");
const router = express.Router();

const gbNews = require("./gbNewsRss");
const bbcNews = require("./bbcNewsRss");
// const skyNews = require("./skyNews");

router.use("/gbnews", gbNews);
router.use("/bbcnews", bbcNews);
// router.use("/skynews", skyNews);

module.exports = router;
