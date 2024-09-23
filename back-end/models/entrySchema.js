// entrySchema.js
const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  topicTitle: {
    type: String,
    required: true,
    maxlength: 150,
  },
  topicDescription: {
    type: String,
    required: true,
    maxlength: 500,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Entry", entrySchema);
