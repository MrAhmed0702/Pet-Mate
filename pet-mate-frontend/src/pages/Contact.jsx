import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { toast } from "react-toastify";

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server Error:", errorData);
        toast.error("Error: " + errorData);
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0f7fa 100%)", // Subtle gradient background
        px: { xs: 2, sm: 0 }, // Responsive padding for smaller screens
      }}
    >
      <Card
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "16px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)", // Teal gradient background
          width: { xs: "100%", sm: "400px" },
          maxWidth: "400px",
          animation: `${fadeIn} 0.5s ease-in-out`,
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: "forresta personal use",
              color: "#ffffff",
              textAlign: "center",
              mb: 4,
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background: "linear-gradient(to right, #ffcc00, #0f6465)",
                borderRadius: "2px",
              },
            }}
          >
            Contact Us
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 0 8px rgba(255, 204, 0, 0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 0 8px rgba(255, 204, 0, 0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 0 8px rgba(255, 204, 0, 0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />
            <TextField
              fullWidth
              label="Address (Optional)"
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 0 8px rgba(255, 204, 0, 0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              error={!!errors.message}
              helperText={errors.message}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 0 8px rgba(255, 204, 0, 0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                backgroundColor: "#ffcc00",
                color: "#0f6465",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#ffb300",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                },
                "&:disabled": {
                  backgroundColor: "#ccc",
                  color: "#666",
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "#0f6465" }} />
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Contact;