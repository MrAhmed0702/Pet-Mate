import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./redux/slices/authSlice";
import PetList from "./components/PetList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pet-Mate
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {user ? (
            <>
              <Typography sx={{ marginRight: 2 }}>{user.name}</Typography>
              <Button color="inherit" onClick={() => dispatch(logoutUser())}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
