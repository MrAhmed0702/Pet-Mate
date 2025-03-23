import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",     // Added phone field
        address: "",   // Added address field
        message: ""
    });

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            // If response is not ok, try to read error message
            const errorData = await response.text(); // Read raw response text
            console.error("Server Error:", errorData);
            alert("Error: " + errorData);
            return;
          }
      
          const data = await response.json(); // This is where the error happens
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", phone: "", address: "", message: "" });
        } catch (error) {
          console.error("Error submitting form:", error);
          alert("Something went wrong!");
        }
      };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Contact Us
                </Typography>

                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        margin="normal"
                        required  // Phone is required
                    />
                    <TextField
                        fullWidth
                        label="Address (Optional)"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Send Message
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Contact;
