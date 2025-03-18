import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";

const styles = {
  background: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #0f6465, #198a8a)", 
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    width: "350px",
  },
  title: {
    fontWeight: "600",
    color: "#0f6465",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: "20px",
    color: "#555",
    textAlign: "center",
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#0f6465",
    "&:hover": {
      backgroundColor: "#0d5a5b",
    },
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    navigate("/");
  };

  return (
    <div style={styles.background}>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h4" style={styles.title}>Login</Typography>
          <Typography variant="body2" style={styles.subtitle}>
            Welcome back! Please enter your credentials.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField 
              fullWidth 
              label="Email" 
              margin="normal" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={styles.input} 
            />
            <TextField 
              fullWidth 
              label="Password" 
              type="password" 
              margin="normal" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input} 
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              style={styles.button}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
