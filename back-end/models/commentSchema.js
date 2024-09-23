const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: true },
  entry: { type: mongoose.Schema.Types.ObjectId, ref: "Entry", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
