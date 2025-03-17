import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../redux/slices/petSlice";
import { requestAdoption } from "../redux/slices/adoptionSlice";
import { Card, CardMedia, CardContent, Typography, Button, Grid } from "@mui/material";

const PetList = () => {
  const dispatch = useDispatch();
  const { pets, status } = useSelector((state) => state.pets);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleAdopt = (petId) => {
    if (!user) {
      alert("You need to log in first!");
      return;
    }
    dispatch(requestAdoption({ petId, token }));
    alert("Adoption request submitted!");
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <Grid container spacing={3}>
      {pets.map((pet) => (
        <Grid item xs={12} sm={6} md={4} key={pet._id}>
          <Card>
            <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
            <CardContent>
              <Typography variant="h5">{pet.name}</Typography>
              <Typography>{pet.breed} - {pet.species}</Typography>
              <Typography>{pet.description}</Typography>
              {!pet.adopted ? (
                <Button variant="contained" color="primary" onClick={() => handleAdopt(pet._id)}>
                  Adopt
                </Button>
              ) : (
                <Typography color="error">Already Adopted</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PetList;
