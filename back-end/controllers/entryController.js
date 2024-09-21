// entryController.js
const Entry = require("../models/entrySchema"); // Import the Mongoose model

// Controller function for creating a new entry
exports.createEntry = async (req, res) => {
  try {
    // Create a new entry based on the data in the request body
    const newEntry = new Entry(req.body);

    // Save the new entry to the database
    const savedEntry = await newEntry.save();

    // Send a response with the saved entry
    res.status(201).json(savedEntry);
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ error: error.message });
  }
};
