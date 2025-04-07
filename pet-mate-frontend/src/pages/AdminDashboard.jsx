import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  ListItemButton,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PetsIcon from "@mui/icons-material/Pets";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import HistoryIcon from "@mui/icons-material/History";
import MessageIcon from "@mui/icons-material/Message";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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

const AdminDashboard = () => {
  const [pet, setPet] = useState({ name: "", age: "", breed: "", species: "", description: "" });
  const [image, setImage] = useState(null);
  const [pets, setPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [adoptionHistory, setAdoptionHistory] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Add Pet");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reasons, setReasons] = useState({}); // Store admin reasons for each request
  const token = localStorage.getItem("token");

  const drawerWidth = 240;
  const collapsedWidth = 60;

  useEffect(() => {
    fetchPets();
    fetchAdoptionRequests();
    fetchContactMessages();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pets");
      setPets(res.data);
    } catch (error) {
      console.error("Error fetching pets", error);
    }
  };

  const fetchAdoptionRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/adoptions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdoptionRequests(res.data.filter((req) => req.status === "Pending"));
      setAdoptionHistory(res.data.filter((req) => req.status !== "Pending"));
    } catch (error) {
      console.error("Error fetching adoption requests", error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContactMessages(res.data);
    } catch (error) {
      console.error("Error fetching contact messages", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", pet.name);
    formData.append("age", pet.age);
    formData.append("breed", pet.breed);
    formData.append("species", pet.species);
    formData.append("description", pet.description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/pets", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Pet added successfully!");
      setPets([...pets, res.data.pet]);
      setPet({ name: "", age: "", breed: "", species: "", description: "" });
      setImage(null);
    } catch (error) {
      alert("Error adding pet");
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Pet deleted successfully!");
      setPets(pets.filter((p) => p._id !== id));
    } catch (error) {
      alert("Error deleting pet");
    }
  };

  const handleEditClick = (pet) => {
    setEditPet(pet);
    setOpen(true);
  };

  const handleEditSave = async () => {
    const formData = new FormData();
    formData.append("name", editPet.name);
    formData.append("age", editPet.age);
    formData.append("breed", editPet.breed);
    formData.append("species", editPet.species);
    formData.append("description", editPet.description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.put(`http://localhost:5000/api/pets/${editPet._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setPets(pets.map((p) => (p._id === editPet._id ? res.data.pet : p)));
      setOpen(false);
      alert("Pet updated successfully!");
    } catch (error) {
      alert("Error updating pet");
    }
  };

  const handleAcceptAdoption = async (requestId, petId) => {
    const reason = reasons[requestId] || "";
    if (!reason.trim()) {
      alert("Please provide a reason for approval.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/adoptions/${requestId}`,
        { status: "Approved", reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Adoption approved!");
      setAdoptionRequests(adoptionRequests.filter((req) => req._id !== requestId));
      setPets(pets.map((p) => (p._id === petId ? { ...p, adopted: true } : p)));
      fetchAdoptionRequests();
      setReasons((prev) => ({ ...prev, [requestId]: "" })); // Clear reason after submission
    } catch (error) {
      alert("Error approving adoption");
    }
  };

  const handleRejectAdoption = async (requestId) => {
    const reason = reasons[requestId] || "";
    if (!reason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/adoptions/${requestId}`,
        { status: "Rejected", reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Adoption request rejected!");
      setAdoptionRequests(adoptionRequests.filter((req) => req._id !== requestId));
      fetchAdoptionRequests();
      setReasons((prev) => ({ ...prev, [requestId]: "" })); // Clear reason after submission
    } catch (error) {
      alert("Error rejecting adoption");
    }
  };

  const handleReasonChange = (requestId, value) => {
    setReasons((prev) => ({ ...prev, [requestId]: value }));
  };

  // Sidebar navigation items
  const navItems = [
    { label: "Add Pet", icon: <AddIcon /> },
    { label: "Pet List", icon: <PetsIcon /> },
    { label: "Adoption Requests", icon: <ListIcon /> },
    { label: "Adoption History", icon: <HistoryIcon /> },
    { label: "Contact Messages", icon: <MessageIcon /> },
  ];

  // Render the active section on the right
  const renderSection = () => {
    switch (activeSection) {
      case "Add Pet":
        return (
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
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
              Add a New Pet
            </Typography>
            <form onSubmit={handleAddPet}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={pet.name}
                onChange={(e) => setPet({ ...pet, name: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#ffcc00" },
                    "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#555",
                    "&.Mui-focused": { color: "#ffcc00" },
                  },
                }}
              />
              <TextField
                label="Age"
                type="number"
                fullWidth
                margin="normal"
                value={pet.age}
                onChange={(e) => setPet({ ...pet, age: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#ffcc00" },
                    "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#555",
                    "&.Mui-focused": { color: "#ffcc00" },
                  },
                }}
              />
              <TextField
                label="Breed"
                fullWidth
                margin="normal"
                value={pet.breed}
                onChange={(e) => setPet({ ...pet, breed: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#ffcc00" },
                    "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#555",
                    "&.Mui-focused": { color: "#ffcc00" },
                  },
                }}
              />
              <TextField
                label="Species"
                fullWidth
                margin="normal"
                value={pet.species}
                onChange={(e) => setPet({ ...pet, species: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#ffcc00" },
                    "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#555",
                    "&.Mui-focused": { color: "#ffcc00" },
                  },
                }}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={pet.description}
                onChange={(e) => setPet({ ...pet, description: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#ffcc00" },
                    "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#555",
                    "&.Mui-focused": { color: "#ffcc00" },
                  },
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ margin: "15px 0", display: "block" }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
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
                }}
              >
                Add Pet
              </Button>
            </form>
          </Card>
        );
      case "Pet List":
        return (
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
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
              Pet List
            </Typography>
            <List>
              {pets.length > 0 ? (
                pets.map((p) => (
                  <ListItem
                    key={p._id}
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
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                          {p.name}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                          {p.species}
                        </Typography>
                      }
                    />
                    <IconButton onClick={() => handleEditClick(p)} sx={{ color: "#ffcc00" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePet(p._id)} sx={{ color: "#f44336" }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                  No pets available.
                </Typography>
              )}
            </List>
          </Card>
        );
      case "Adoption Requests":
        return (
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
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
              Adoption Requests
            </Typography>
            <List>
              {adoptionRequests.length > 0 ? (
                adoptionRequests.map((req) => (
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
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                          User: {req.user?.name} ({req.user?.email})
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                            Pet: {req.pet?.name}
                          </Typography>
                          <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666", mt: 1 }}>
                            Adopter Name: {req.adopterDetails?.name}
                          </Typography>
                          <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                            Phone: {req.adopterDetails?.phone}
                          </Typography>
                          <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                            Reason: {req.adopterDetails?.reason}
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, width: "100%" }}>
                      <TextField
                        label="Reason for Decision"
                        value={reasons[req._id] || ""}
                        onChange={(e) => handleReasonChange(req._id, e.target.value)}
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&:hover fieldset": { borderColor: "#ffcc00" },
                            "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#555",
                            "&.Mui-focused": { color: "#ffcc00" },
                          },
                        }}
                      />
                      <IconButton
                        color="success"
                        onClick={() => handleAcceptAdoption(req._id, req.pet._id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleRejectAdoption(req._id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                  No pending adoption requests.
                </Typography>
              )}
            </List>
          </Card>
        );
      case "Adoption History":
        return (
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
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
              Adoption History
            </Typography>
            <List>
              {adoptionHistory.length > 0 ? (
                adoptionHistory.map((req) => (
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
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                          User: {req.user?.name}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                          Pet: {req.pet?.name}, Status: {req.status}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                  No completed adoptions.
                </Typography>
              )}
            </List>
          </Card>
        );
      case "Contact Messages":
        return (
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
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
              Contact Messages
            </Typography>
            <List>
              {contactMessages.length > 0 ? (
                contactMessages.map((msg) => (
                  <React.Fragment key={msg._id}>
                    <ListItem
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
                            variant="subtitle1"
                            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
                          >
                            {msg.name} ({msg.email})
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}
                            >
                              <strong>Phone:</strong> {msg.phone}
                            </Typography>
                            {msg.address && (
                              <Typography
                                variant="body2"
                                sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}
                              >
                                <strong>Address:</strong> {msg.address}
                              </Typography>
                            )}
                            <Typography
                              variant="body2"
                              sx={{ fontFamily: "'Poppins', sans-serif", mt: 1 }}
                            >
                              {msg.message}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: "#666" }}>
                  No messages yet.
                </Typography>
              )}
            </List>
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
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{ color: "white" }}>
            {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
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
              Admin Dashboard
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
          p: 4,
          backgroundColor: "#ffffff",
          transition: "margin-left 0.3s ease",
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
          overflowY: "auto",
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">{renderSection()}</Container>

        {/* Edit Pet Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            Edit Pet
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editPet?.name || ""}
              onChange={(e) => setEditPet({ ...editPet, name: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <TextField
              label="Age"
              type="number"
              fullWidth
              margin="normal"
              value={editPet?.age || ""}
              onChange={(e) => setEditPet({ ...editPet, age: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <TextField
              label="Breed"
              fullWidth
              margin="normal"
              value={editPet?.breed || ""}
              onChange={(e) => setEditPet({ ...editPet, breed: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <TextField
              label="Species"
              fullWidth
              margin="normal"
              value={editPet?.species || ""}
              onChange={(e) => setEditPet({ ...editPet, species: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={editPet?.description || ""}
              onChange={(e) => setEditPet({ ...editPet, description: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffcc00" },
                  "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
                },
                "& .MuiInputLabel-root": {
                  color: "#555",
                  "&.Mui-focused": { color: "#ffcc00" },
                },
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ margin: "15px 0", display: "block" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                color: "#f44336",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSave}
              sx={{
                backgroundColor: "#ffcc00",
                color: "#0f6465",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                px: 3,
                borderRadius: "12px",
                "&:hover": { backgroundColor: "#ffb300" },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminDashboard;