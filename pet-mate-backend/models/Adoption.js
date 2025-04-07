const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    adopterDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      reason: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminResponse: {
      reason: { type: String, default: "" },
      respondedAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = Adoption;