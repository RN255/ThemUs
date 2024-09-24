// commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Route for creating a new entry
router.post("/comments", commentController.createComment);

// Route for fetching comments by topic id
router.get("/comments/:topicId", commentController.getCommentsByTopicId);

module.exports = router;
