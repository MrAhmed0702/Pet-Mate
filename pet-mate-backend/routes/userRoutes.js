const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Upload profile picture
router.put("/profile-picture", protect, upload.single("profilePicture"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Determine correct image path
    const folder = user.isAdmin ? "AdminImage" : "UserImage";
    user.profilePicture = `/uploads/ProfileImage/${folder}/${req.file.filename}`;
    
    await user.save();

    res.json({ message: "Profile picture updated successfully", profilePicture: user.profilePicture });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
