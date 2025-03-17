import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { Container, TextField, Button, Typography } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
