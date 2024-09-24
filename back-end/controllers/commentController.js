// entryController.js
const Comment = require("../models/commentSchema"); // Import the Mongoose model

// Controller function for creating a new comment
exports.createComment = async (req, res) => {
  try {
    // Create a new entry based on the data in the request body
    const newComment = new Comment(req.body);

    // Save the new entry to the database
    const savedComment = await newComment.save();

    // Send a response with the saved entry
    res.status(201).json(savedComment);
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ error: error.message });
  }
};

// Controller function for fetching comments by topic ID
exports.getCommentsByTopicId = async (req, res) => {
  const topicId = req.params.topicId; // Get the topic ID from the request parameters

  try {
    // Fetch comments where 'entry' matches the topicId
    const comments = await Comment.find({ entry: topicId });

    if (!comments || !comments.length) {
      // If no comments are found, return a 404 response
      return res
        .status(404)
        .json({ message: "No comments found for this topic" });
    }

    // Send the retrieved comments as a JSON response
    res.status(200).json(comments);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
};
