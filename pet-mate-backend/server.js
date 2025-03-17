// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Allows Express to parse JSON data
app.use(cors()); // Allows frontend to communicate with backend

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to Pet-Mate API!");
});

// Define PORT (default to 5000)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const petRoutes = require("./routes/petRoutes");
app.use("/api/pets", petRoutes);
