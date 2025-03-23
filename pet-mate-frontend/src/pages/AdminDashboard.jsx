import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const AdminDashboard = () => {
  const [pet, setPet] = useState({ name: "", age: "", breed: "", species: "", description: "" });
  const [image, setImage] = useState(null);
  const [pets, setPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const token = localStorage.getItem("token");
  const [editPet, setEditPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [adoptionHistory, setAdoptionHistory] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    fetchPets();
    fetchAdoptionRequests();
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
      setAdoptionRequests(res.data.filter(req => req.status === "Pending"));
      setAdoptionHistory(res.data.filter(req => req.status !== "Pending"));
    } catch (error) {
      console.error("Error fetching adoption requests", error);
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
    try {
      await axios.put(
        `http://localhost:5000/api/adoptions/${requestId}`,
        { status: "Approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Adoption approved!");
      setAdoptionRequests(adoptionRequests.filter((req) => req._id !== requestId));
      setPets(pets.map((p) => (p._id === petId ? { ...p, adopted: true } : p)));
    } catch (error) {
      alert("Error approving adoption");
    }
  };

  const handleRejectAdoption = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/adoptions/${requestId}`,
        { status: "Rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Adoption request rejected!");
      setAdoptionRequests(adoptionRequests.filter((req) => req._id !== requestId));
    } catch (error) {
      alert("Error rejecting adoption");
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

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

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Admin Dashboard</Typography>

      {/* Pet Form */}
      <form onSubmit={handleAddPet}>
        <TextField label="Name" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
        <TextField label="Age" type="number" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, age: e.target.value })} />
        <TextField label="Breed" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, breed: e.target.value })} />
        <TextField label="Species" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, species: e.target.value })} />
        <TextField label="Description" fullWidth margin="normal" onChange={(e) => setPet({ ...pet, description: e.target.value })} />
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ margin: "10px 0" }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Pet
        </Button>
      </form>

      {/* Pet List */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>Pet List</Typography>
      <List>
        {pets.map((p) => (
          <ListItem key={p._id}>
            <ListItemText primary={p.name} secondary={p.species} />
            <IconButton onClick={() => handleEditClick(p)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDeletePet(p._id)}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>

      {/* Edit Pet Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Pet</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" value={editPet?.name || ""} onChange={(e) => setEditPet({ ...editPet, name: e.target.value })} />
          <TextField label="Age" type="number" fullWidth margin="normal" value={editPet?.age || ""} onChange={(e) => setEditPet({ ...editPet, age: e.target.value })} />
          <TextField label="Breed" fullWidth margin="normal" value={editPet?.breed || ""} onChange={(e) => setEditPet({ ...editPet, breed: e.target.value })} />
          <TextField label="Species" fullWidth margin="normal" value={editPet?.species || ""} onChange={(e) => setEditPet({ ...editPet, species: e.target.value })} />
          <TextField label="Description" fullWidth margin="normal" value={editPet?.description || ""} onChange={(e) => setEditPet({ ...editPet, description: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ margin: "10px 0" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Adoption Requests */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>Adoption Requests</Typography>
      <List>
        {adoptionRequests.length > 0 ? (
          adoptionRequests.map((req) => (
            <ListItem key={req._id}>
              <ListItemText primary={`User: ${req.user?.name}, Pet: ${req.pet?.name}`} />
              <IconButton color="success" onClick={() => handleAcceptAdoption(req._id, req.pet._id)}>
                <CheckIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleRejectAdoption(req._id)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography>No pending adoption requests.</Typography>
        )}
      </List>

      {/* Adoption History */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>Adoption History</Typography>
      <List>
        {adoptionHistory && adoptionHistory.length > 0 ? (
          adoptionHistory.map((req) => (
            <ListItem key={req._id}>
              <ListItemText primary={`User: ${req.user?.name}, Pet: ${req.pet?.name}, Status: ${req.status}`} />
            </ListItem>
          ))
        ) : (
          <Typography>No completed adoptions.</Typography>
        )}
      </List>

      <Typography variant="h5" style={{ marginTop: "20px", fontWeight: "bold" }}>
        Contact Messages
      </Typography>

      <List>
        {contactMessages.length > 0 ? (
          contactMessages.map((msg) => (
            <React.Fragment key={msg._id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {msg.name} ({msg.email})
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        <strong>Phone:</strong> {msg.phone}
                      </Typography>
                      {msg.address && (
                        <Typography variant="body2" color="text.primary">
                          <strong>Address:</strong> {msg.address}
                        </Typography>
                      )}
                      <Typography variant="body2" style={{ marginTop: "8px" }}>
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
          <Typography variant="body1" color="text.secondary" style={{ marginTop: "10px" }}>
            No messages yet.
          </Typography>
        )}
      </List>


    </Container>
  );
};

export default AdminDashboard;
