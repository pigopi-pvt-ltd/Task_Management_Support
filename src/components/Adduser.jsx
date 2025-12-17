import React, { useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

const Adduser = ({
  open,
  handleClose,
  newUser,
  setNewUser,
  fetchUsers,
  setSnackbar,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCreateUser = useCallback(async () => {
    try {
      await axiosInstance.post("/supportUsers", {
        username: newUser.username,
        password: newUser.password,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      });
      setSnackbar({
        open: true,
        message: "User created successfully",
        severity: "success",
      });
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
      setSnackbar({
        open: true,
        message: "Failed to create user",
        severity: "error",
      });
    }
  }, [newUser, fetchUsers, handleClose, setSnackbar]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Add New User
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
          autoComplete="off"
        />
        <TextField
          margin="dense"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          label="Full Name"
          type="text"
          fullWidth
          value={newUser.fullname}
          onChange={(e) =>
            setNewUser({ ...newUser, fullname: e.target.value })
          }
          autoComplete="off"
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          autoComplete="off"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={newUser.role}
            label="Role"
    
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateUser}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(Adduser);
