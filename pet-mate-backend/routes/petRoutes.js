const express = require("express");
const Pet = require("../models/Pet");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new pet (Admin only)
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { name, age, breed, species, description, image } = req.body;

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
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });

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
