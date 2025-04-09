const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
