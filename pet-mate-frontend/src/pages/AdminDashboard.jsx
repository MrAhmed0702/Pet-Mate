import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDashboard = () => {
  const [pet, setPet] = useState({ name: "", age: "", breed: "", species: "", description: "", image: "" });
  const [pets, setPets] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pets");
        setPets(res.data);
      } catch (error) {
        console.error("Error fetching pets", error);
      }
    };
    fetchPets();
  }, []);

  // Add a new pet
  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/pets", pet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Pet added successfully!");
      setPets([...pets, pet]); // Update the UI
    } catch (error) {
      alert("Error adding pet");
    }
  };

  // Delete a pet
  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Pet deleted successfully!");
      setPets(pets.filter((p) => p._id !== id)); // Remove from UI
    } catch (error) {
      alert("Error deleting pet");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Admin Dashboard</Typography>

      {/* Add Pet Form */}
      <form onSubmit={handleAddPet}>
        <TextField label="Name" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
        <TextField label="Age" type="number" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, age: e.target.value })} />
        <TextField label="Breed" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, breed: e.target.value })} />
        <TextField label="Species" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, species: e.target.value })} />
        <TextField label="Description" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, description: e.target.value })} />
        <TextField label="Image URL" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, image: e.target.value })} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Pet
        </Button>
      </form>

      {/* Pet List */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Pet List
      </Typography>
      <List>
        {pets.map((p) => (
          <ListItem key={p._id}>
            <ListItemText primary={p.name} secondary={p.species} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePet(p._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminDashboard;
