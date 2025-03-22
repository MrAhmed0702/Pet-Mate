import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import PetList from "./components/PetList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import HomePage from "./pages/HomePage";
import MyPets from "./pages/MyPets";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Ensure the container takes up the full viewport height
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Main content grows to fill the remaining space
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/adopt" element={<ProtectedRoute><PetList /></ProtectedRoute>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/my-pets" element={<MyPets />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;