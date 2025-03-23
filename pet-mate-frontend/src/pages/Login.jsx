import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { keyframes } from "@emotion/react";

// Fade-in animation (aligned with Navbar/Footer)
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
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
          background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)", // Teal gradient from Footer
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
            Welcome Back
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
            Log in to find your furry friend!
          </Typography>
          <form onSubmit={handleLogin}>
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
                  transform: "scale(1.05)", // Slight scale like Navbar icons
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Login
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
            Don’t have an account?{" "}
            <Button
              component="a"
              href="/register"
              sx={{
                color: "#ffcc00",
                textTransform: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Register
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;