import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CustomTable from "../components/Custom/CustomTable";
import axiosInstance from "../utils/axiosInstance";
import Snackbar from "../components/Snackbar/Snackbar";
import Adduser from "../components/Adduser";
import { jwtDecode } from "jwt-decode";

const getInitials = (name) => {
  if (!name || typeof name !== 'string') {
    return '?';
  }
  const nameParts = name.trim().split(' ').filter(part => part.length > 0);
  if (nameParts.length === 0) {
    return '?';
  }
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  }
  const firstNameInitial = nameParts[0][0];
  const lastNameInitial = nameParts[nameParts.length - 1][0];
  return (firstNameInitial + lastNameInitial).toUpperCase();
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    role: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    } else {
        
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/supportUsers/list");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch users",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpen = () => {
    setNewUser({
      username: "",
      password: "",
      fullname: "",
      email: "",
      role: "",
    });
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);



  const columns = useMemo(() => [
    {
      field: "username",
      headerName: "User",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem' }}>{getInitials(params.row.fullname)}</Avatar>
          <Typography>{params.row.username}</Typography>
        </Box>
      ),
    },
    { field: "fullname", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: () => (
        <Box
          sx={{
            display:"flex",
            alignItems:"center",
            height:"100%",
          }}
        >
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ], []);

  return (
    <Box p={0.5} sx={{ backgroundColor: '#F5F5F5', height: '100vh' }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={0.5}
        px={0.5}
        height={35}
      >
        <Typography variant="h5" fontWeight="bold">
          Users Management
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Add User
        </Button>
      </Box>

      {/* Table */}
      <CustomTable rows={users} columns={columns} loading={loading} />
      <Adduser
        open={open}
        handleClose={handleClose}
        newUser={newUser}
        setNewUser={setNewUser}
        fetchUsers={fetchUsers}
        setSnackbar={setSnackbar}
      />
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default Users;

