const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 6000, // limit the saved letter itself
  },
  jobTitle: String,
  company: String,
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true },
    displayName: String,
    email: { type: String, unique: true },
    photo: String,
    plan: { type: String, enum: ["free", "premium"], default: "free" },
    usedLetters: { type: Number, default: 0 },
    letterLimit: { type: Number, default: 3 },
    renewsAt: { type: Date },
    coverLetters: [coverLetterSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
