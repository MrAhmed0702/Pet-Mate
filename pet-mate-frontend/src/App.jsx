// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import PetList from "./components/PetList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserProfile from "./pages/UserProfile";
import HomePage from "./pages/HomePage";
import MyPets from "./pages/MyPets";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify 
import DonationPage from "./pages/DonationPage";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "#f5f7fa",
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/adopt" element={<ProtectedRoute><PetList /></ProtectedRoute>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<ProtectedRoute> <AdminRoute> <AdminDashboard /> </AdminRoute> </ProtectedRoute>} />
            <Route path="/my-pets" element={<MyPets />} />
            <Route path="*" element={<Box sx={{ textAlign: "center", py: 5 }}><h2>404 - Page Coming Soon</h2></Box>}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/donate" element={<DonationPage />} />
          </Routes>
        </Box>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> {/* Add ToastContainer */}
      </Box>
    </Router>
  );
};

export default App;