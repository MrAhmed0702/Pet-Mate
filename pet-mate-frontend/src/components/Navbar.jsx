import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Avatar, IconButton } from "@mui/material";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#184141" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "forresta personal use", fontSize: "2.5rem" }}>
          Pet-Mate
        </Typography>

        {/* Common Links */}
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/adopt">Adopt</Button>
        <Button color="inherit" component={Link} to="/about">About Us</Button>
        <Button color="inherit" component={Link} to="/contact">Contact Us</Button>

        {/* User Dropdown */}
        {user ? (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
            <Avatar  src={`http://localhost:5000${user?.profilePicture}`}  alt="Profile" />
              {console.log(user)}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >

              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "Robotics", fontSize: "20px" }}>{user?.name}</Typography>

              <MenuItem onClick={() => { handleMenuClose(); navigate("/profile"); }}>Profile</MenuItem>
              {user?.isAdmin && (
                <MenuItem onClick={() => { handleMenuClose(); navigate("/admin"); }}>Dashboard</MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleMenuOpen}>Account</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate("/login"); }}>Login</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate("/register"); }}>Register</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
