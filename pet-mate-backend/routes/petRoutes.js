const express = require("express");
const multer = require("multer");
const path = require("path");
const Pet = require("../models/Pet");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Add a new pet (Admin only)
router.post("/", protect, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, age, breed, species, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newPet = new Pet({ name, age, breed, species, description, image });
    await newPet.save();

    res.status(201).json({ message: "Pet added successfully!", pet: newPet });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a pet (Admin only)
router.put("/:id", protect, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, age, breed, species, description } = req.body;
    let image;
    
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else {
      image = pet.image;
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { name, age, breed, species, description, image },
      { new: true }
    );

    res.json({ message: "Pet updated successfully!", pet: updatedPet });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a pet (Admin only)
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: "Pet not found" });

    res.json({ message: "Pet deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
