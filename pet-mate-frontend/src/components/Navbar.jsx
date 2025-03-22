import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #184141 0%, #1a8a8b 100%)", // Gradient background
        animation: `${fadeIn} 1s ease-in-out`, // Fade-in animation
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            fontFamily: "Forresta personal use", // Modern font
            fontSize: "2.5rem",
            letterSpacing: "2px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Subtle shadow for text
          }}
        >
          Pet-Mate
        </Typography>

        {/* Common Links */}
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            mx: 1,
            px: 2,
            py: 1,
            borderRadius: "20px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffcc00", // Hover color
              textDecoration: "underline",
            },
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/adopt"
          sx={{
            mx: 1,
            px: 2,
            py: 1,
            borderRadius: "20px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffcc00",
              textDecoration: "underline",
            },
          }}
        >
          Adopt
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{
            mx: 1,
            px: 2,
            py: 1,
            borderRadius: "20px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffcc00",
              textDecoration: "underline",
            },
          }}
        >
          About Us
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          sx={{
            mx: 1,
            px: 2,
            py: 1,
            borderRadius: "20px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffcc00",
              textDecoration: "underline",
            },
          }}
        >
          Contact Us
        </Button>

        {/* User Dropdown */}
        {user ? (
          <>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                ml: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)", // Glow effect
                },
              }}
            >
              <Avatar
                src={`http://localhost:5000${user?.profilePicture}`}
                alt="Profile"
                sx={{
                  border: "2px solid #ffcc00", // Border around avatar
                }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: "#184141", // Match navbar background
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                  mt: 1,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  px: 2,
                  py: 1,
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                {user?.name}
              </Typography>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/profile");
                }}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffcc00",
                  },
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/my-pets");
                }}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffcc00",
                  },
                }}
              >
                My Pets
              </MenuItem>
              {user?.isAdmin && (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/admin");
                  }}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#ffcc00",
                    },
                  }}
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem
                onClick={handleLogout}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffcc00",
                  },
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                mx: 1,
                px: 2,
                py: 1,
                borderRadius: "20px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffcc00",
                  textDecoration: "underline",
                },
              }}
            >
              Account
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: "#184141",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                  mt: 1,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/login");
                }}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffcc00",
                  },
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/register");
                }}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffcc00",
                  },
                }}
              >
                Register
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;