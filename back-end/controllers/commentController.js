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
