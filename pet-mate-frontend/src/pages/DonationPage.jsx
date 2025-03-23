import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";

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

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const upiID = "mohammed.jayanti51220-1@okicici";
  const name = "MohammedJayanti";
  const minAmount = 10; // Minimum donation amount in INR

  // Generate UPI URL
  const upiURL = `upi://pay?pa=${upiID}&pn=${name}&mc=&tid=&tr=&tn=Donation&am=${amount}&cu=INR`;

  // Validate the donation amount
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (value === "") {
      setError("");
    } else if (isNaN(value) || Number(value) <= 0) {
      setError("Please enter a valid amount");
    } else if (Number(value) < minAmount) {
      setError(`Minimum donation amount is ₹${minAmount}`);
    } else {
      setError("");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0f7fa 100%)", // Match HomePage background
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3 }, width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            Donate to Support Pet-Mate
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              animation: `${fadeIn} 1s ease-in-out`,
            }}
          >
            {/* Donation Amount Input */}
            <TextField
              type="number"
              value={amount}
              onChange={handleAmountChange}
              label="Enter Donation Amount (₹)"
              variant="outlined"
              error={!!error}
              helperText={error}
              inputProps={{ min: 0 }}
              sx={{
                width: { xs: "100%", sm: 300 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "#0f6465",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffcc00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffcc00",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#0f6465",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ffcc00",
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />

            {/* QR Code and Donation Info */}
            {amount && !error && (
              <Card
                sx={{
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
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <QRCodeCanvas
                      value={upiURL}
                      size={200}
                      level="H" // High error correction level for better scanning
                      includeMargin={true}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "#666",
                      mt: 2,
                      mb: 3,
                    }}
                  >
                    Scan the QR code to donate ₹{amount}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default DonationPage;