import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  Drawer,
  ListItemButton,
  IconButton as MuiIconButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

// Pulse animation for the Avatar on hover
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 204, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
  }
`;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [adoptionHistory, setAdoptionHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeSection, setActiveSection] = useState("Profile");
  const [isUploading, setIsUploading] = useState(false);
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const drawerWidth = 240;
  const collapsedWidth = 60;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    const fetchAdoptionRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/adoptions/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingRequests(res.data.pendingRequests);
        setAdoptionHistory(res.data.history);
      } catch (error) {
        console.error("Error fetching adoption requests", error);
      }
    };

    fetchUserProfile();
    fetchAdoptionRequests();
  }, []);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const res = await axios.put("http://localhost:5000/api/users/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      setUser((prevUser) => ({ ...prevUser, profilePicture: res.data.profilePicture }));
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading profile picture", error);
      alert("Error uploading profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const navItems = [
    { label: "Profile", icon: <PersonIcon /> },
    { label: "Current Adoption Requests", icon: <ListIcon /> },
    { label: "Adoption History", icon: <HistoryIcon /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Profile":
        return (
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              animation: `${fadeIn} 0.5s ease-in-out`,
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, rgba(15, 100, 101, 0.1), rgba(255, 204, 0, 0.1))",
                zIndex: -1,
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "forresta personal use",
                fontWeight: "bold",
                color: "#0f6465",
                mb: 4,
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  width: "60px",
                  height: "4px",
                  background: "linear-gradient(to right, #ffcc00, #0f6465)",
                  borderRadius: "2px",
                },
              }}
            >
              Your Profile
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                <Avatar
                  src={user?.profilePicture ? `http://localhost:5000${user.profilePicture}` : undefined}
                  alt="Profile"
                  sx={{
                    width: { xs: 120, sm: 140 },
                    height: { xs: 120, sm: 140 },
                    margin: "0 auto",
                    border: "4px solid transparent",
                    background: "linear-gradient(45deg, #ffcc00, #0f6465) border-box",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      animation: `${pulse} 1.5s infinite`,
                    },
                  }}
                />
                <Box sx={{ mt: 3 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    id="profile-picture-upload"
                  />
                  <label htmlFor="profile-picture-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        borderRadius: "12px",
                        borderColor: "#ffcc00",
                        color: "#0f6465",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "bold",
                        textTransform: "none",
                        py: 1,
                        px: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#ffb300",
                          backgroundColor: "rgba(255, 204, 0, 0.1)",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      Choose File
                    </Button>
                  </label>
                  {selectedFile && (
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#666",
                        mt: 1,
                        fontSize: "0.9rem",
                      }}
                    >
                      {selectedFile.name}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleImageUpload}
                    disabled={isUploading || !selectedFile}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: "12px",
                      backgroundColor: "#ffcc00",
                      color: "#0f6465",
                      fontWeight: "bold",
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#ffb300",
                        transform: "scale(1.02)",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                      },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                        color: "#666",
                      },
                    }}
                  >
                    {isUploading ? (
                      <CircularProgress size={24} sx={{ color: "#0f6465" }} />
                    ) : (
                      "Upload Picture"
                    )}
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    color: "#0f6465",
                    letterSpacing: "0.5px",
                  }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#666",
                    mt: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  {user?.email}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        );

      case "Current Adoption Requests":
        return (
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              animation: `${fadeIn} 0.5s ease-in-out`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "forresta personal use",
                fontWeight: "bold",
                color: "#0f6465",
                mb: 3,
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
              }}
            >
              🕒 Current Adoption Requests
            </Typography>
            {pendingRequests.length === 0 ? (
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#666",
                }}
              >
                No pending requests.
              </Typography>
            ) : (
              <List>
                {pendingRequests.map((req) => (
                  <ListItem
                    key={req._id}
                    sx={{
                      borderRadius: "10px",
                      mb: 1,
                      backgroundColor: "#f5f7fa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#e0f7fa",
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          Pet: {req.pet?.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#666",
                          }}
                        >
                          Status: {req.status}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        );

      case "Adoption History":
        return (
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              animation: `${fadeIn} 0.5s ease-in-out`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "forresta personal use",
                fontWeight: "bold",
                color: "#0f6465",
                mb: 3,
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
              }}
            >
              ✅ Adoption History
            </Typography>
            {adoptionHistory.length === 0 ? (
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#666",
                }}
              >
                No adoption history.
              </Typography>
            ) : (
              <List>
                {adoptionHistory.map((req) => (
                  <ListItem
                    key={req._id}
                    sx={{
                      borderRadius: "10px",
                      mb: 1,
                      backgroundColor: "#f5f7fa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#e0f7fa",
                        transform: "scale(1.01)",
                      },
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          Pet: {req.pet?.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              color: req.status === "Approved" ? "green" : "red",
                            }}
                          >
                            Status: {req.status}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              color: "#666",
                              mt: 1,
                            }}
                          >
                            Admin Response: {req.adminResponse?.reason || "No reason provided"}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins', sans-serif",
                              color: "#666",
                            }}
                          >
                            Responded At: {req.adminResponse?.respondedAt
                              ? new Date(req.adminResponse.respondedAt).toLocaleDateString()
                              : "N/A"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Sidebar (Left Side) */}
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #0f6465 0%, #1a8a8b 100%)",
            color: "white",
            animation: `${fadeIn} 0.5s ease-in-out`,
            height: "100%",
            position: "relative",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <MuiIconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{ color: "white" }}>
            {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </MuiIconButton>
        </Box>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
        {isSidebarOpen && (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "forresta personal use",
                fontWeight: "bold",
                letterSpacing: "2px",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
              }}
            >
              User Profile
            </Typography>
          </Box>
        )}
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              sx={{
                py: 1.5,
                transition: "all 0.3s ease",
                backgroundColor:
                  activeSection === item.label ? "rgba(255, 255, 255, 0.2)" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffcc00",
                  transform: "scale(1.02)",
                },
                justifyContent: isSidebarOpen ? "flex-start" : "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: isSidebarOpen ? 2 : 0 }}>
                {item.icon}
                {isSidebarOpen && (
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content (Right Side) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "transparent",
          transition: "margin-left 0.3s ease",
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
          overflowY: "auto",
          minHeight: "100%",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#0f6465",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#1a8a8b",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: { xs: 3, sm: 4 },
            pb: { xs: 5, sm: 6 },
          }}
        >
          {renderSection()}
        </Container>
      </Box>
    </Box>
  );
};

export default UserProfile;