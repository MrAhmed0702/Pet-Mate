const express = require("express");
const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Request adoption (User)
router.post("/", protect, async (req, res) => {
  try {
    const { petId } = req.body;
    const userId = req.user.id;

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    // Check if pet is already adopted
    if (pet.adopted) return res.status(400).json({ message: "Pet is already adopted" });

    // Check if the user has already requested adoption
    const existingRequest = await Adoption.findOne({ user: userId, pet: petId });
    if (existingRequest) return res.status(400).json({ message: "You have already requested to adopt this pet" });

    // Create adoption request
    const adoptionRequest = new Adoption({ user: userId, pet: petId });
    await adoptionRequest.save();

    res.status(201).json({ message: "Adoption request submitted successfully", request: adoptionRequest });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all adoption requests (Admin only)
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const requests = await Adoption.find()
      .populate("user", "name email")
      .populate("pet", "name species")
      .lean();

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get user's adoption requests (Pending + History)
router.get("/user", protect, async (req, res) => {
  try {
    const requests = await Adoption.find({ user: req.user.id })
      .populate("pet", "name species")
      .lean();

    const pendingRequests = requests.filter(r => r.status === "Pending");
    const history = requests.filter(r => r.status !== "Pending"); // Approved/Rejected

    res.json({ pendingRequests, history });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Approve or reject an adoption request (Admin only)
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const { status } = req.body; // Expect "Approved" or "Rejected"

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find adoption request
    const adoptionRequest = await Adoption.findById(req.params.id);
    if (!adoptionRequest) return res.status(404).json({ message: "Adoption request not found" });

    // Update adoption request status
    adoptionRequest.status = status;
    await adoptionRequest.save();

    // If approved, mark the pet as adopted
    if (status === "Approved") {
      await Pet.findByIdAndUpdate(adoptionRequest.pet, { adopted: true });
    }

    res.json({ message: `Adoption request ${status.toLowerCase()} successfully!`, request: adoptionRequest });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
