import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";

// Fade-in animation for each step
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const steps = [
  "Explore our selection of pets awaiting their forever homes.",
  'Select the "Adopt" option for a pet available for adoption.',
  "Our team will conduct a personal verification and schedule a home visit to ensure a suitable match.",
  "Upon successful evaluation, the adoption will be finalized; otherwise, the application may be declined.",
  "If approved, you will receive updates through a call.",
  'You can track the application in the "Current Adoption Request" section in your profile and receive updates on the adoption process.',
];

// How Adoption Works Section
const HowAdoptionWorks = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)",
        borderRadius: "16px",
        p: { xs: 3, sm: 4 },
        mb: 6,
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontFamily: "forresta personal use",
          color: "#ffffff",
          mb: 4,
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
          position: "relative",
          textAlign: "center",
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
        How Adoption Works
      </Typography>
      <Stack spacing={2}>
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              p: 2,
              transition: "all 0.3s ease",
              animation: `${fadeIn} 0.5s ease-in-out`,
              animationDelay: `${index * 0.2}s`,
              animationFillMode: "forwards",
              opacity: 0, // Start with opacity 0 for animation
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {/* Step Number Indicator */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#ffcc00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                flexShrink: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#0f6465",
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {index + 1}
              </Typography>
            </Box>
            {/* Step Text */}
            <Typography
              variant="body1"
              sx={{
                color: "#eeeeee",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.6,
                flexGrow: 1,
              }}
            >
              {step}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

// Export the section to be used in AboutUs.jsx
export default HowAdoptionWorks;