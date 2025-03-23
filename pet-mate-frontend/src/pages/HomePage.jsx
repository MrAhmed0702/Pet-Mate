import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";

// Fade-in animation (consistent with other components)
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

// Slide data
const slides = [
  {
    image: "/src/assets/Banners/banner1.jpg",
    title: "Your Furry Friend Awaits",
    text: "Adopting a pet is a noble act. Can’t adopt? Donate to ensure they’re cared for. Your love can change the world!",
    button: "Donate Now",
  },
  {
    image: "/src/assets/Banners/banner2.jpg",
    title: "Make a Difference Today",
    text: "Bring home love and transform a pet’s life with Pet-Mate!",
    button: "Adopt Now",
  },
  {
    image: "/src/assets/Banners/banner3.jpg",
    title: "Be Their Hero",
    text: "Every pet deserves a home—help us make it happen!",
    button: "Help Now",
  },
];

// Feedback data
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
    <Box sx={{ overflow: "hidden", backgroundColor: "#ffffff" }}>
      {/* Hero Banner (Swiper) */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                position: "relative",
                animation: `${fadeIn} 1s ease-in-out`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "forresta personal use", // From Navbar/Footer
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Depth like Navbar
                    mb: 2,
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    maxWidth: "700px",
                    mx: "auto",
                    mb: 4,
                    color: "#eeeeee",
                  }}
                >
                  {slide.text}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffcc00", // Yellow from theme
                    color: "#0f6465",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                    px: 5,
                    py: 1.5,
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ffb300",
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  {slide.button}
                </Button>
              </motion.div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Featured Pets Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            }}
          >
            Meet Our Featured Pets
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {pets.length > 0 ? (
              pets.map((pet, index) => (
                <Grid item xs={12} sm={6} md={4} key={pet._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        borderRadius: "20px",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                        overflow: "visible",
                        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
                        transition: "all 0.3s ease",
                        position: "relative", // Add this to make the Card a positioned ancestor
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                          border: "2px solid #ffcc00",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={`http://localhost:5000${pet.image}`}
                        alt={pet.name}
                        sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 15,
                          right: 15,
                          backgroundColor: pet.status === "available" ? "#4caf50" : "#f44336",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {pet.status === "available" ? "Available" : "Adopted"}
                      </Box>
                      <CardContent>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                            color: "#0f6465",
                          }}
                        >
                          {pet.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#666",
                          }}
                        >
                          {pet.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            ) : (
              <Typography
                align="center"
                sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}
              >
                Loading pets...
              </Typography>
            )}
          </Grid>
        </motion.div>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)", // Light teal like Login/Register
          py: 10,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "forresta personal use",
              fontWeight: "bold",
              color: "#0f6465",
              mb: 3,
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            Ready to Change a Life?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#666",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Adopt a pet or donate to support our mission of spreading pawsitivity!
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffcc00",
              color: "#0f6465",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              px: 6,
              py: 1.5,
              borderRadius: "25px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffb300",
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Get Involved
          </Button>
        </motion.div>
      </Box>

      {/* Feedback Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            }}
          >
            Voices of Joy
          </Typography>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            spaceBetween={30}
            slidesPerView={1}
            style={{ width: "100%", paddingBottom: "50px" }}
          >
            {feedbacks.map((feedback, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 4,
                      maxWidth: "900px",
                      mx: "auto",
                      borderRadius: "20px",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                      background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
                      border: "2px solid",
                      borderImage: "linear-gradient(135deg, #ffcc00, #1a8a8b) 1",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={feedback.image}
                      alt={feedback.user}
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        border: "3px solid #ffcc00",
                        mr: 4,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 0 15px rgba(255, 204, 0, 0.5)",
                        },
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontStyle: "italic",
                          color: "#666",
                          mb: 2,
                        }}
                      >
                        "{feedback.text}"
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "bold",
                          color: "#ffcc00",
                        }}
                      >
                        — {feedback.user}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;