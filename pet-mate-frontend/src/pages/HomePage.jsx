import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
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

// Slide data
const slides = [
  {
    image: "/src/assets/Banners/banner1.jpg",
    title: "Your Furry Friend Awaits",
    text: "Adopting a pet is a noble act. Can’t adopt? Donate to ensure they’re cared for. Your love can change the world!",
    button: "Donate Now",
    link: "/donate",
  },
  {
    image: "/src/assets/Banners/banner2.jpg",
    title: "Make a Difference Today",
    text: "Bring home love and transform a pet’s life with Pet-Mate!",
    button: "Adopt Now",
    link: "/adopt",
  },
  {
    image: "/src/assets/Banners/banner3.jpg",
    title: "Be Their Hero",
    text: "Every pet deserves a home—help us make it happen!",
    button: "Help Now",
    link: "/donate",
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
  const [loading, setLoading] = useState(true);
  const [petImageErrors, setPetImageErrors] = useState({});
  const [feedbackImageErrors, setFeedbackImageErrors] = useState({});

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");
        setPets(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Handle pet image load errors
  const handlePetImageError = (petId) => {
    setPetImageErrors((prev) => ({ ...prev, [petId]: true }));
  };

  // Handle feedback image load errors
  const handleFeedbackImageError = (index) => {
    setFeedbackImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0f7fa 100%)",
        minHeight: "100vh",
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      {/* Hero Banner (Swiper) */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          style={{ width: "99vw" }} // Fit within the parent Box
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: { xs: "60vh", sm: "80vh" },
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
                      fontFamily: "forresta personal use",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                      mb: 2,
                      fontSize: { xs: "2rem", sm: "3rem" },
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
                      fontSize: { xs: "1rem", sm: "1.5rem" },
                    }}
                  >
                    {slide.text}
                  </Typography>
                  <Button
                    component={Link}
                    to={slide.link}
                    variant="contained"
                    sx={{
                      backgroundColor: "#ffcc00",
                      color: "#0f6465",
                      fontWeight: "bold",
                      fontFamily: "'Poppins', sans-serif",
                      px: 5,
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
                    {slide.button}
                  </Button>
                </motion.div>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Featured Pets Section */}
      <Box
        sx={{
          py: 10,
        }}
      >
        <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3 } }}>
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
                color: "#0f6465", // Changed to teal to match the overall theme
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
              Meet Our Featured Pets
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {loading ? (
                <Typography
                  align="center"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#666", // Changed to a darker color for better contrast
                    width: "100%",
                  }}
                >
                  Loading pets...
                </Typography>
              ) : pets.length > 0 ? (
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
                          borderRadius: "16px",
                          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                          background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
                          transition: "all 0.3s ease",
                          position: "relative",
                          border: "2px solid rgba(255, 255, 255, 0.2)",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                            borderColor: "#ffcc00",
                          },
                        }}
                      >
                        {petImageErrors[pet._id] || !pet.image ? (
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
                            image={`http://localhost:5000${pet.image}`}
                            alt={pet.name}
                            onError={() => handlePetImageError(pet._id)}
                            sx={{
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                            }}
                          />
                        )}
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
                            fontFamily: "'Poppins', sans-serif",
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
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#666", // Changed to a darker color for better contrast
                    width: "100%",
                  }}
                >
                  No pets available at the moment.
                </Typography>
              )}
            </Grid>
          </motion.div>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)",
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
              color: "#ffffff",
              mb: 3,
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
            Ready to Change a Life?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#eeeeee", // Changed to a lighter color for better contrast
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Adopt a pet or donate to support our mission of spreading pawsitivity!
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
              px: 6,
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
            Get Involved
          </Button>
        </motion.div>
      </Box>

      {/* Feedback Section */}
      <Box
        sx={{
          py: 10,
        }}
      >
        <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3 } }}>
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
                color: "#0f6465", // Changed to teal to match the overall theme
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
                        borderRadius: "16px",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
                        border: "2px solid rgba(255, 255, 0, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                          borderColor: "#ffcc00",
                        },
                      }}
                    >
                      {feedbackImageErrors[index] || !feedback.image ? (
                        <Box
                          sx={{
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            border: "3px solid #ffcc00",
                            mr: 4,
                            backgroundColor: "#ffcc00",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 0 15px rgba(255, 204, 0, 0.5)",
                            },
                          }}
                        >
                          <PetsIcon sx={{ fontSize: 50, color: "#0f6465" }} />
                        </Box>
                      ) : (
                        <CardMedia
                          component="img"
                          image={feedback.image}
                          alt={feedback.user}
                          onError={() => handleFeedbackImageError(index)}
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
                      )}
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
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;