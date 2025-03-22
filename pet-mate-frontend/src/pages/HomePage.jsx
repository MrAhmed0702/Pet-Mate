import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import { motion } from "framer-motion";

// Slide data
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
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Banner (Swiper) */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000 }}
        loop
        className="hero-slider"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "40px",
                color: "white",
                width: "100vw",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "2px", mb: 2 }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "'Poppins', sans-serif", maxWidth: "600px", mb: 3 }}
                >
                  {slide.text}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffcc00",
                    color: "#0f6465",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                    px: 4,
                    py: 1.5,
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#e6b800",
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={6}
            fontWeight="bold"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "#0f6465" }}
          >
            Featured Pets
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {pets.length > 0 ? (
              pets.map((pet, index) => (
                <Grid item xs={12} sm={4} key={pet._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                        borderRadius: "15px",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "visible",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={`http://localhost:5000${pet.image}`}
                        alt={pet.name}
                        sx={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: pet.status === "available" ? "#4caf50" : "#f44336",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                        }}
                      >
                        {pet.status === "available" ? "Available" : "Adopted"}
                      </Box>
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ fontFamily: "'Poppins', sans-serif", color: "#0f6465" }}
                        >
                          {pet.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {pet.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            ) : (
              <Typography align="center" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                Loading pets...
              </Typography>
            )}
          </Grid>
        </motion.div>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
          py: 8,
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
            fontWeight="bold"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "#0f6465", mb: 3 }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "#666", mb: 4, maxWidth: "600px", mx: "auto" }}
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
              px: 5,
              py: 1.5,
              borderRadius: "25px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#e6b800",
                transform: "scale(1.05)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Get Involved
          </Button>
        </motion.div>
      </Box>

      {/* Feedback Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={6}
            fontWeight="bold"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "#0f6465" }}
          >
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "30px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      borderRadius: "15px",
                      maxWidth: "800px",
                      margin: "auto",
                      backgroundColor: "white",
                      border: "2px solid",
                      borderImage: "linear-gradient(to right, #ffcc00, #1a8a8b) 1",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={feedback.image}
                      alt="User feedback"
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        objectFit: "cover",
                        mr: 3,
                        border: "3px solid #ffcc00",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 0 10px rgba(255, 204, 0, 0.5)",
                        },
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        fontStyle="italic"
                        sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}
                      >
                        "{feedback.text}"
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        mt={2}
                        sx={{ fontFamily: "'Poppins', sans-serif", color: "#ffcc00" }}
                      >
                        - {feedback.user}
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