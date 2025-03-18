import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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
} from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [adoptionHistory, setAdoptionHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");

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
    } catch (error) {
      console.error("Error uploading profile picture", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
              <Avatar
                src={`http://localhost:5000${user?.profilePicture}`}
                alt="Profile"
                sx={{ width: 120, height: 120, margin: "0 auto" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleImageUpload}
                sx={{ mt: 2 }}
              >
                Upload
              </Button>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user?.email}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Pending Adoption Requests */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        🕒 Current Adoption Requests
      </Typography>
      {pendingRequests.length === 0 ? (
        <Typography color="textSecondary">No pending requests.</Typography>
      ) : (
        <List>
          {pendingRequests.map((req) => (
            <ListItem key={req._id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={`Pet: ${req.pet?.name}`}
                secondary={`Status: ${req.status}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Adoption History */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        ✅ Adoption History
      </Typography>
      {adoptionHistory.length === 0 ? (
        <Typography color="textSecondary">No adoption history.</Typography>
      ) : (
        <List>
          {adoptionHistory.map((req) => (
            <ListItem key={req._id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={`Pet: ${req.pet?.name}`}
                secondary={`Status: ${req.status}`}
                sx={{ color: req.status === "Approved" ? "green" : "red" }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UserProfile;
