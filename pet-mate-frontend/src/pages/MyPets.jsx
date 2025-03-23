import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

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

const MyPets = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [petImageErrors, setPetImageErrors] = useState({});
  const { user, token } = useSelector((state) => state.auth); // Get user and token

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your adopted pets.");
      setLoading(false);
      return;
    }

    const fetchMyPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adoptions/my-pets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdoptedPets(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching adopted pets. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [token]);

  // Handle pet image load errors
  const handlePetImageError = (petId) => {
    setPetImageErrors((prev) => ({ ...prev, [petId]: true }));
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0f7fa 100%)", // Match HomePage background
        minHeight: "100vh",
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "forresta personal use",
              fontWeight: "bold",
              color: "#0f6465",
              mb: 6,
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
            My Adopted Pets
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress sx={{ color: "#0f6465" }} />
            </Box>
          ) : error ? (
            <Typography
              align="center"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: "#f44336",
                mt: 4,
              }}
            >
              {error}
            </Typography>
          ) : adoptedPets.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {adoptedPets.map((adoption, index) => (
                <Grid item xs={12} sm={6} md={4} key={adoption.pet._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        borderRadius: "16px",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
                        transition: "all 0.3s ease",
                        border: "2px solid rgba(255, 255, 0, 0.2)",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                          borderColor: "#ffcc00",
                        },
                      }}
                    >
                      {petImageErrors[adoption.pet._id] || !adoption.pet.image ? (
                        <Box
                          sx={{
                            height: 250,
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                            backgroundColor: "#ffcc00",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PetsIcon sx={{ fontSize: 100, color: "#0f6465" }} />
                        </Box>
                      ) : (
                        <CardMedia
                          component="img"
                          height="250"
                          image={`http://localhost:5000${adoption.pet.image}`}
                          alt={adoption.pet.name}
                          onError={() => handlePetImageError(adoption.pet._id)}
                          sx={{
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                          }}
                        />
                      )}
                      <CardContent>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                            color: "#0f6465",
                            textAlign: "center",
                          }}
                        >
                          {adoption.pet.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#666",
                  mb: 3,
                }}
              >
                You haven’t adopted any pets yet.
              </Typography>
              <Button
                component={Link}
                to="/adopt"
                variant="contained"
                sx={{
                  backgroundColor: "#ffcc00",
                  color: "#0f6465",
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#ffb300",
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Adopt a Pet Now
              </Button>
            </Box>
          )}
        </motion.div>
      </Box>
    </Box>
  );
};

export default MyPets;