const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    species: { type: String, required: true }, // Dog, Cat, etc.
    description: { type: String },
    image: { type: String }, // Image URL (for now, later we can add file uploads)
    adopted: { type: Boolean, default: false }, // Adoption status
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
