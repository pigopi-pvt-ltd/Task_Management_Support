import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import PigoPiLogo from "../../assets/PigoPi.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleAuthLogout } from "../../store/slices/authSlice";
const Topbar = ({ handleDrawerToggle, username, branchName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(handleAuthLogout());
    navigate("/");
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <img src={PigoPiLogo} alt="PigoPi Logo" style={{ height: "40px" }} />

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="h6" component="div">
          Support
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* User Info Section */}
          <Box sx={{ mr: 3, textAlign: "right" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", lineHeight: 1 }}
            >
              {username}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {branchName}
            </Typography>
          </Box>

          {/* Actual Logout Button */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleLogout()}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
