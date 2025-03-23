import React from "react";
import { Container, Typography, Grid, Card, CardContent, Avatar, Box } from "@mui/material";
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

const teamMembers = [
  { name: "Ahmed Mohammed Jayanti Mochi", role: "Founder & CTO", image: "#" },
  { name: "Maulik Shreemali", role: "Founder & CEO", image: "#" },
  { name: "Hitesh Bhakta", role: "Marketing Manager & Communication Director", image: "#" },
  { name: "Hiten Patil", role: "Chief Financial Officer (CFO)", image: "#" },
  { name: "Sanjay Kumar Bhardwaj", role: "HR & Staff Director", image: "#" }
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 5, animation: `${fadeIn} 1s ease-in-out` }}>
      <Typography variant="h3" fontWeight="bold" color="#0f6465" mb={3}>
        About Us
      </Typography>
      <Typography variant="body1" color="#333" mb={4}>
        Welcome to our pet adoption platform, where love finds a home. Our mission is to connect loving families with pets in need,
        creating lifelong bonds and happy stories. With passion, dedication, and innovation, we strive to make adoption seamless and fulfilling.
      </Typography>

      <Typography variant="h4" fontWeight="bold" color="#1a8a8b" mb={3}>
        Our Mission & Vision
      </Typography>
      <Typography variant="body1" color="#444" mb={4}>
        We believe every pet deserves a loving home. Our vision is to create a world where no pet is left without a family.
        By leveraging technology, compassionate care, and community support, we ensure that pet adoption is accessible, safe, and heartwarming.
      </Typography>

      <Typography variant="h4" fontWeight="bold" color="#1a8a8b" mb={3}>
        How Adoption Works
      </Typography>
      <Typography variant="body1" color="#444" mb={4}>
        1. Browse our adorable pets looking for a home. <br />
        2. Fill out an adoption application. <br />
        3. Meet your furry friend. <br />
        4. Complete the adoption process & bring them home! <br />
      </Typography>

      <Typography variant="h4" fontWeight="bold" color="#1a8a8b" mb={3}>
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, borderRadius: "12px", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", textAlign: "center" }}>
              <Avatar src={member.image} alt={member.name} sx={{ width: 100, height: 100, margin: "0 auto" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="#0f6465">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="#555">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;
