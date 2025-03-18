import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";

const HomePage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");  // Adjust URL as needed
        setPets(response.data.slice(0, 3));  // Get only the first 3 pets
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Hero Banner */}
      <div style={styles.banner}>
        <Typography variant="h3" color="white" fontWeight="bold">
          Find Your Perfect Pet Companion
        </Typography>
        <Typography variant="h6" color="white" mt={2}>
          Adopt a loving pet today and give them a forever home!
        </Typography>
        <Button variant="contained" color="secondary" sx={{ marginTop: 3, backgroundColor: "#FFD700" }}>
          Browse Pets
        </Button>
      </div>

      {/* Featured Pets */}
      <Typography variant="h4" align="center" mt={5} mb={3} fontWeight="bold" color="#0f6465">
        Featured Pets
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <Grid item xs={12} sm={4} key={pet._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardMedia component="img" height="250" image={pet.imageUrl} alt={pet.name} />
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">{pet.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{pet.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography align="center">Loading pets...</Typography>
        )}
      </Grid>
    </Container>
  );
};

// Styles
const styles = {
  banner: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('/images/banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
    color: "white",
    borderRadius: "10px",
    marginTop: "20px",
  },
};

export default HomePage;
