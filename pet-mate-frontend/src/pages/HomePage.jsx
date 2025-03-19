import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import axios from "axios";

const slides = [
  {
    image: "/src/assets/Banners/banner1.jpg",
    title: "Your Furry Friend is Waiting",
    text: "Adopting a pet is a good deed. If not, adopt them by just donating. We will take care of them. Let your love change the world!",
    button: "Donate Now",
  },
  {
    image: "/src/assets/Banners/banner2.jpg",
    title: "Do Something That Matters",
    text: "Adopt love and make a difference in a pet's life today!",
    button: "Adopt Now",
  },
  {
    image: "/src/assets/Banners/banner3.jpg",
    title: "Do Something That Matters",
    text: "Adopt love and make a difference in a pet's life today!",
    button: "Help Now",
  },
];

const HomePage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");
        setPets(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Swiper Hero Banner */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000 }}
        loop
        className="hero-slider"
        style={{ width: "99.5vw", marginLeft: "calc(-50vw + 50%)" }} // Full-width Swiper
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "20px",
              color: "#0f6465",
              width: "100vw"
            }}>
              <Typography variant="h3" fontWeight="bold" ml={4}>{slide.title}</Typography>
              <Typography variant="h6" mt={2} ml={4}>{slide.text}</Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 3, ml: 4, backgroundColor: "orange" }}>
                {slide.button}
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Featured Pets Section */}
      <Typography variant="h4" align="center" mt={5} mb={3} fontWeight="bold" color="#0f6465">
        Featured Pets
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <Grid item xs={12} sm={4} key={pet._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardMedia component="img" height="250" image={`http://localhost:5000${pet.image}`} alt={pet.name} />
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

export default HomePage;