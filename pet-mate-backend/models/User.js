const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profilePicture: { type: String, default: "/uploads/default-profile.png" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // Admin role check
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
