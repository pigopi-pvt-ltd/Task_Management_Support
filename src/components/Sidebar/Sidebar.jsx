import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NumbersIcon from "@mui/icons-material/Numbers";
import ChatIcon from "@mui/icons-material/Chat";

import { getCurrentUserData } from "../../utils/auth";

const Sidebar = ({ mobileOpen }) => {
  const location = useLocation();
  const user = getCurrentUserData(); // { role: "admin" | "employee" }

  // 🔹 Sidebar Menu Configuration
  const menuItems = [
    {
      label: "Users",
      path: "/users",
      icon: <SupportAgentIcon />,
      roles: ["admin"], // ❗ only admin
    },
    {
      label: "All Tickets",
      path: "/all-tickets",
      icon: <ConfirmationNumberIcon />,
      roles: ["admin", "employee"], // ✅ both can see
    },
    {
      label: "All Chats",
      path: "/chat-management",
      icon: <NumbersIcon />,
      roles: ["admin", "employee"], // ✅ both can see
    },
    {
      label: "Live Chat",
      path: "/live-chat",
      icon: <ChatIcon />,
      roles: ["admin", "employee"], // ✅ both can see
    },
  ];

  // 🔹 Filter menu based on user role
  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role)
  );

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#fff",
        px: 1,
        pt: 2,
        overflow: "auto",
      }}
    >
      <List>
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                bgcolor: isActive ? "#1976d2" : "transparent",
                color: isActive ? "#fff" : "#333",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: isActive ? "#1565c0" : "#f5f5f5",
                },
                boxShadow: isActive ? "inset 5px 0 0 0 #063a72ff" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive ? "#fff" : "#242323ff",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
