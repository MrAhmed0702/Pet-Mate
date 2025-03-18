import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAdoptRequest = async () => {
    try {
      await axios.post("http://localhost:5000/api/adoptions", { petId: id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Adoption request sent!");
    } catch (error) {
      alert(error.response.data.message || "Error requesting adoption");
    }
  };

  if (!pet) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{pet.name}</Typography>
      <Typography variant="body1">{pet.description}</Typography>
      <Button variant="contained" color="primary" onClick={handleAdoptRequest}>
        Request Adoption
      </Button>
    </Container>
  );
};

export default PetDetails;
