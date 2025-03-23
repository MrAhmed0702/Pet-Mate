import React from "react";
import { Container, Grid, Typography, Link, Box } from "@mui/material";
import { Instagram, WhatsApp, Mail, YouTube } from "@mui/icons-material";
import { keyframes } from "@emotion/react";

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

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)",
        color: "white",
        mt: 0,
        pt: { xs: 3, sm: 4 }, // Reduced padding-top for a more compact look
        pb: { xs: 2, sm: 3 }, // Reduced padding-bottom
        animation: `${fadeIn} 1s ease-in-out`,
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Pet-Mate Info */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "forresta personal use",
                letterSpacing: "1px",
                fontSize: "1.5rem",
              }}
            >
              Pet-Mate
            </Typography>
            <Typography variant="body2" mt={1}>
              Pet-Mate: Where wagging tails meet warm hearts. We’re a non-profit on a mission for the furry smiles. 🐾
            </Typography>
            <Typography variant="body2" mt={1}>
              Join us in spreading pawsitivity! #DogWelfare #PetMate
            </Typography>
          </Grid>

          {/* About Section */}
          <Grid item xs={6} sm={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1px",
              }}
            >
              About
            </Typography>
            <Box mt={1}>
              <Link
                href="/about"
                color="inherit"
                display="block"
                sx={{
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffcc00",
                    textDecoration: "underline",
                  },
                }}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                color="inherit"
                display="block"
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffcc00",
                    textDecoration: "underline",
                  },
                }}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Get Involved */}
          <Grid item xs={6} sm={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1px",
              }}
            >
              Get Involved
            </Typography>
            <Box mt={1}>
              <Link
                href="/adopt"
                color="inherit"
                display="block"
                sx={{
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffcc00",
                    textDecoration: "underline",
                  },
                }}
              >
                Adopt
              </Link>
              <Link
                href="/donate"
                color="inherit"
                display="block"
                sx={{
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffcc00",
                    textDecoration: "underline",
                  },
                }}
              >
                Donate
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1px",
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" mt={1}>📞 +91 82386 38287</Typography>
            <Typography variant="body2" mt={1}>📧 ahmed.mohammed@rku.ac.in</Typography>
            <Typography variant="body2" mt={1}>📍 East Blue</Typography>

            {/* Social Media Icons */}
            <Box mt={2} display="flex" gap={2} justifyContent="flex-start">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram
                  sx={{
                    fontSize: 30,
                    color: "white",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    padding: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
              <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                <WhatsApp
                  sx={{
                    fontSize: 30,
                    color: "white",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    padding: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
              <Link href="mailto:ahmed.mohammed@rku.ac.in">
                <Mail
                  sx={{
                    fontSize: 30,
                    color: "white",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    padding: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <YouTube
                  sx={{
                    fontSize: 30,
                    color: "white",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    padding: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Decorative Divider */}
        <Box
          sx={{
            width: "50px",
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            margin: "30px auto 15px", // Reduced margin for a more compact look
          }}
        />

        {/* Copyright Text */}
        <Typography
          align="center"
          variant="body2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.5px",
            pb: 1, // Add some padding at the bottom
          }}
        >
          © 2025 Pet-Mate. All rights reserved. | Designed by Ahmed Mohammed Jayanti Mochi aka Mr. A
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;