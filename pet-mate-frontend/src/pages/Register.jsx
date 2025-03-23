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
} from "@mui/material";
import { keyframes } from "@emotion/react";

// Fade-in animation (consistent with Login/Navbar/Footer)
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({ name, email, password }));
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 4,
          borderRadius: "16px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)", // Teal gradient from Footer/Login
          width: { xs: "90%", sm: "400px" }, // Responsive width
          animation: `${fadeIn} 1s ease-in-out`, // Fade-in effect
          border: "2px solid rgba(255, 255, 255, 0.2)", // Subtle white border
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "forresta personal use", // From Navbar/Footer
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)", // Depth like Navbar
              mb: 1,
            }}
          >
            Join Pet-Mate
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#eeeeee",
              textAlign: "center",
              mb: 3,
              fontFamily: "'Poppins', sans-serif", // From Footer
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover fieldset": {
                    borderColor: "#ffcc00", // Yellow hover like Navbar
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffcc00",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover fieldset": {
                    borderColor: "#ffcc00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffcc00",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover fieldset": {
                    borderColor: "#ffcc00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffcc00",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: "12px",
                backgroundColor: "#ffcc00", // Yellow from Navbar/Footer
                color: "#0f6465", // Teal text for contrast
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#ffb300", // Darker yellow hover
                  transform: "scale(1.05)", // Slight scale like Navbar
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Register
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