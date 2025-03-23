import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { keyframes } from "@emotion/react";
import HowAdoptionWorks from "./HowAdoptionWorks"; // Import the new section

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

const teamMembers = [
  { name: "Ahmed Mohammed Jayanti Mochi", role: "Founder & CTO", image: "/src/assets/Our Team/Ahmed.jpeg" },
  { name: "Maulik JagdishBhai Shreemali", role: "Founder & CEO", image: "/src/assets/Our Team/Maulik.jpg" },
  { name: "Hitesh Hari Bhakta", role: "Marketing Manager & Communication Director", image: "/src/assets/Our Team/Popat.jpg" },
  { name: "Hiten Jagdish Patil", role: "Chief Financial Officer (CFO)", image: "/src/assets/Our Team/Hiten.jpg" },
  { name: "Sanjay Kumar Bhardwaj", role: "HR & Staff Director", image: "/src/assets/Our Team/Sanjay.jpg" },
];

const AboutUs = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0f7fa 100%)",
        py: { xs: 4, sm: 6 },
        animation: `${fadeIn} 1s ease-in-out`,
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3 } }}>
        {/* About Us Section */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontFamily: "forresta personal use",
            color: "#0f6465",
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
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#333",
            mb: 6,
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.6,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Welcome to our pet adoption platform, where love finds a home. Our mission is to connect loving families with pets in need,
          creating lifelong bonds and heartwarming stories. With passion, dedication, and innovation, we strive to make the adoption process seamless and fulfilling.
        </Typography>

        {/* Mission & Vision Section */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontFamily: "forresta personal use",
            color: "#1a8a8b",
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
          Our Mission & Vision
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#444",
            mb: 6,
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.6,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          We believe every pet deserves a loving home. Our vision is to create a world where no pet is left without a family.
          By leveraging technology, compassionate care, and community support, we ensure that pet adoption is accessible, safe, and heartwarming.
        </Typography>

        {/* How Adoption Works Section */}
        <HowAdoptionWorks />

        {/* Meet Our Team Section */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontFamily: "forresta personal use",
            color: "#1a8a8b",
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
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                  background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "#ffffff",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#eeeeee",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUs;