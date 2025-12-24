import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Drawer, useTheme, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Header/Topbar";
import axios from "axios";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../Snackbar/Snackbar";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUsername(res.data.username);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleClickBranch = async (branchId) => {
    try {
      const res = await axios.get(`/api/branch/${branchId}`);
      setSelectedBranch(res.data.name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* CHANGE #1: Topbar full width, always on top */}
      <Topbar
        handleDrawerToggle={handleDrawerToggle}
        username={username}
        branchName={selectedBranch}
      />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <>
          {/* Desktop Sidebar */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                top: "64px",
                height: "calc(100% - 64px)",
                borderRadius: 0,
                display: isFullscreen ? "none" : "block",
              },
            }}
            open
          >
            <Sidebar
              mobileOpen={mobileOpen}
            />
          </Drawer>

          {/* Mobile Sidebar */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            TransitionComponent={Slide}
            transitionDuration={{ enter: 500, exit: 500 }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                borderRadius: 0,
                display: isFullscreen ? "none" : "block",
              },
            }}
          >
            <Box sx={{ textAlign: 'right', p: 1 }}>
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Sidebar
              mobileOpen={mobileOpen}
            />
          </Drawer>
        </>

        {/* Main Content */}
        <Box
          id="page-content"
          component="main"
          sx={{
            flexGrow: 1,
            p: 0.5,
            overflowY: "auto",
            bgcolor: "#eeeeee",
            ml: !isFullscreen ? { md: `${drawerWidth}px` } : 0, // shift when sidebar visible
            transition: "all 0.3s ease",
            height: "calc(100vh - 64px)", // Set explicit height for scrolling
          }}
        >
          <Outlet />
          <CustomSnackbar />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
