const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: true, maxlength: 3000 },
  entry: { type: mongoose.Schema.Types.ObjectId, ref: "Entry", required: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: ["support", "oppose"], required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
