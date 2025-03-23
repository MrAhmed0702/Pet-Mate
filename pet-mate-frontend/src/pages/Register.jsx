import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field being edited
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      toast.success("Registration Successful! Please login to continue.");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0f7fa 100%)", // Subtle gradient background for the page
        px: { xs: 2, sm: 0 }, // Responsive padding for smaller screens
      }}
    >
      <Card
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "16px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)", // Keep the teal gradient background
          width: { xs: "100%", sm: "400px" },
          maxWidth: "400px",
          animation: `${fadeIn} 1s ease-in-out`,
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "forresta personal use",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
              mb: 1,
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
            Join Pet-Mate
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#eeeeee",
              textAlign: "center",
              mb: 4,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Create an account to start your pet journey!
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
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
              variant="outlined"
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
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
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
              disabled={loading}
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
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#0f6465" }} />
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#eeeeee",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Already have an account?{" "}
            <Button
              component="a"
              href="/login"
              sx={{
                color: "#ffcc00",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Login
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;