import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, Button, Chip, CircularProgress, Modal, TextField } from "@mui/material";
import { fetchPets } from "../redux/slices/petSlice";
import { requestAdoption } from "../redux/slices/adoptionSlice";
import { toast } from "react-toastify";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); }`;

const PetList = () => {
  const dispatch = useDispatch();
  const { pets, status, error } = useSelector((state) => state.pets);
  const { token } = useSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState({});
  const [adoptModalOpen, setAdoptModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [adoptForm, setAdoptForm] = useState({ name: "", email: "", phone: "", reason: "" });

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleOpenAdoptModal = (petId) => {
    if (!token) {
      toast.error("You need to be logged in to adopt a pet.");
      return;
    }
    setSelectedPetId(petId);
    setAdoptModalOpen(true);
  };

  const handleCloseAdoptModal = () => {
    setAdoptModalOpen(false);
    setSelectedPetId(null);
    setAdoptForm({ name: "", email: "", phone: "", reason: "" });
  };

  const handleAdoptFormChange = (e) => {
    const { name, value } = e.target;
    setAdoptForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdoptSubmit = async () => {
    if (!adoptForm.name || !adoptForm.email || !adoptForm.phone || !adoptForm.reason) {
      toast.error("Please fill in all adoption details.");
      return;
    }
    try {
      await dispatch(requestAdoption({ petId: selectedPetId, token, ...adoptForm })).unwrap();
      toast.success("Adoption request sent successfully!");
      handleCloseAdoptModal();
    } catch (err) {
      toast.error(err.message || "Failed to send adoption request.");
    }
  };

  return (
    <Box sx={styles.pageBackground}>
      <title>Adopt a Pet | Pet-Mate</title>
      <meta name="description" content="Browse and adopt pets available at Pet-Mate." />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight="bold" color="#0f6465" mt={5} mb={3}>
          ADOPT A PET
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <Card sx={styles.card}>
                  {/* Pet Image with Age Tag */}
                  <Box sx={styles.imageContainer}>
                    <CardMedia component="img" height="250" image={`http://localhost:5000${pet.image}`} alt={pet.name} sx={styles.image} loading="lazy"/>
                    <Chip label={`${pet.age} ${pet.age > 1 ? "years" : "year"}`} sx={styles.ageTag} />
                  </Box>

                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="#0f6465">
                      {pet.name}
                    </Typography>

                    {/* Icons for Pet Info */}
                    <Box sx={styles.petInfo}>
                      <Typography variant="body2">✅ Vaccination complete</Typography>
                    </Box>

                    {/* Show adoption status */}
                    {pet.adopted ? (
                      <Typography variant="body2" color="red" mt={1}>
                        Adopted
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        sx={styles.button}
                        onClick={() => handleOpenAdoptModal(pet._id)}
                        aria-label={`Adopt ${pet.name}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleOpenAdoptModal(pet._id);
                        }}
                      >
                        Adopt
                      </Button>
                    )}

                    {/* Know More Button to Show Description */}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={styles.knowMoreButton}
                      onClick={() => setShowDetails(prev => ({ ...prev, [pet._id]: !prev[pet._id] }))}
                    >
                      {showDetails[pet._id] ? "Hide Details" : "Know More"}
                    </Button>

                    {showDetails[pet._id] && (
                      <Typography variant="body2" color="text.secondary" sx={styles.description}>
                        {pet.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center">No pets available...</Typography>
          )}
        </Grid>
      </Container>

      {/* Adoption Modal */}
      <Modal open={adoptModalOpen} onClose={handleCloseAdoptModal} aria-labelledby="adoption-form-title">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "white", borderRadius: "12px", boxShadow: 24, p: 4 }}>
          <Typography id="adoption-form-title" variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", color: "#0f6465", mb: 2 }}>Adoption Request</Typography>
          <TextField fullWidth label="Name" name="name" value={adoptForm.name} onChange={handleAdoptFormChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" name="email" type="email" value={adoptForm.email} onChange={handleAdoptFormChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" name="phone" value={adoptForm.phone} onChange={handleAdoptFormChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Reason for Adoption" name="reason" multiline rows={4} value={adoptForm.reason} onChange={handleAdoptFormChange} required sx={{ mb: 2 }} />
          <Button variant="contained" onClick={handleAdoptSubmit} sx={{ backgroundColor: "#ffcc00", color: "#0f6465", "&:hover": { backgroundColor: "#ffb300" } }}>Submit Request</Button>
        </Box>
      </Modal>

    </Box>
  );
};

// Styles
const styles = {
  pageBackground: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
  card: {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    minHeight: "450px",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    objectFit: "cover",
  },
  ageTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#e57373",
    color: "#fff",
    fontWeight: "bold",
  },
  petInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "10px",
  },
  button: {
    marginTop: "15px",
    backgroundColor: "#0f6465",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0d5a5b",
    },
  },
  knowMoreButton: {
    marginTop: "10px",
    backgroundColor: "#0f6465",
    "&:hover": {
      backgroundColor: "#0d5a5b",
    },
  },
  description: {
    marginTop: "10px",
    backgroundColor: "#f5f5f5",
    padding: "8px",
    borderRadius: "5px",
  },
};

export default PetList;