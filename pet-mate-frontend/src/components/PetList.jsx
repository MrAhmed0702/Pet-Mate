import { Button, Card, CardContent, CardMedia, Container, Grid, Typography, Box, Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [showDetails, setShowDetails] = useState({}); // Track which pet details are shown
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleAdopt = async (petId) => {
    if (!token) {
      alert("You need to be logged in to adopt a pet.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/adoptions",
        { petId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Adoption request sent successfully!");
      setPets(pets.map(pet => pet._id === petId ? { ...pet, adopted: true } : pet));
    } catch (error) {
      console.error("Error sending adoption request:", error);
      alert("Failed to send adoption request.");
    }
  };

  return (
    <Box sx={styles.pageBackground}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight="bold" color="#ffffff" mt={5} mb={3}>
          Adopt a Pet
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <Card sx={styles.card}>
                  {/* Pet Image with Age Tag */}
                  <Box sx={styles.imageContainer}>
                    <CardMedia component="img" height="250" image={`http://localhost:5000${pet.image}`} alt={pet.name} sx={styles.image} />
                    <Chip label={`${pet.age} ${pet.age > 1 ? "years" : "year"}`} sx={styles.ageTag} />
                  </Box>

                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="#0f6465">
                      {pet.name}
                    </Typography>

                    {/* Icons for Pet Info */}
                    <Box sx={styles.petInfo}>
                      <Typography variant="body2">✅ Vaccination complete</Typography>
                    </Box>

                    {/* Show adoption status */}
                    {pet.adopted ? (
                      <Typography variant="body2" color="red" mt={1}>
                        Adopted
                      </Typography>
                    ) : (
                      <Button variant="contained" sx={styles.button} onClick={() => handleAdopt(pet._id)}>
                        Adopt
                      </Button>
                    )}

                    {/* Know More Button to Show Description */}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={styles.knowMoreButton}
                      onClick={() => setShowDetails(prev => ({ ...prev, [pet._id]: !prev[pet._id] }))}
                    >
                      {showDetails[pet._id] ? "Hide Details" : "Know More"}
                    </Button>

                    {showDetails[pet._id] && (
                      <Typography variant="body2" color="text.secondary" sx={styles.description}>
                        {pet.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center">No pets available...</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

// Styles
const styles = {
  pageBackground: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #0f6465, #117a7a)",
  },
  card: {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    minHeight: "450px",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    objectFit: "cover",
  },
  ageTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#e57373",
    color: "#fff",
    fontWeight: "bold",
  },
  petInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "10px",
  },
  button: {
    marginTop: "15px",
    backgroundColor: "#0f6465",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0d5a5b",
    },
  },
  knowMoreButton: {
    marginTop: "10px",
    backgroundColor: "#0f6465",
    "&:hover": {
      backgroundColor: "#0d5a5b",
    },
  },
  description: {
    marginTop: "10px",
    backgroundColor: "#f5f5f5",
    padding: "8px",
    borderRadius: "5px",
  },
};

export default PetList;
