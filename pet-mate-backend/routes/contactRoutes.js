const express = require("express");
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your admin email
    pass: process.env.EMAIL_PASS, // App password or actual email password
  },
});

// POST - Save contact form data and send email
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "Name, Email, Phone, and Message are required." });
    }

    // Save message to database
    const newContact = new Contact({ name, email, phone, address, message });
    await newContact.save();

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address ? address : "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET - Fetch all contact messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
