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

const feedbacks = [
  {
    text: "Gratitude fills my heart as I embrace my new found wife, the gift of love I found at Pet-Mate.",
    user: "Sanjay Kumar Bhardwaj",
    image: "/src/assets/Feedbacks/feedback1.jpg",
  },
  {
    text: "Pet-Mate gave me my long lost twin. I can’t imagine life without him! Thank you Pet-Mate!",
    user: "Hitesh Bhakta",
    image: "/src/assets/Feedbacks/feedback2.jpg",
  },
  {
    text: "Adopting from Pet-Mate changed my life. Thank you for the joy of having Helloten!",
    user: "Hiten Patil",
    image: "/src/assets/Feedbacks/feedback3.jpg",
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

      {/* Feedback Section */}
      <Typography variant="h4" align="center" mt={5} mb={3} fontWeight="bold" color="#0f6465">
        What Our Adopters Say
      </Typography>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        spaceBetween={30}
        slidesPerView={1}
        style={{ width: "100%", paddingBottom: "40px" }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                boxShadow: 3,
                borderRadius: 3,
                maxWidth: "800px",
                margin: "auto",
                backgroundColor: "#fffaf0",
              }}
            >
              <CardMedia
                component="img"
                image={feedback.image}
                alt="User feedback"
                sx={{ width: 180, height: 180, borderRadius: "50%", objectFit: "cover", mr: 3 }}
              />
              <CardContent>
                <Typography variant="body1" fontStyle="italic">
                  "{feedback.text}"
                </Typography>
                <Typography variant="h6" color="orange" fontWeight="bold" mt={1}>
                  - {feedback.user}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default HomePage;