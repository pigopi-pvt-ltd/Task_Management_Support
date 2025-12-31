import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";

const UpdateTickets = ({
  open,
  onClose,
  ticket,
  onUpdated,
  onUpdateSuccess,
  onUpdateError,
}) => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      setFormData({
        subject: ticket.subject || "",
        description: ticket.description || "",
        status: ticket.status || "",
      });
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/supportUsers/update-ticket?id=${ticket.id}`,
        formData
      );
      onUpdateSuccess?.("Ticket updated successfully!");
      onUpdated?.();
      onClose();
    } catch (error) {
      onUpdateError?.(
        error.response?.data?.message || "Failed to update ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { height: '100%' } }}>
      <DialogTitle sx={{ fontWeight: 600 }}>
        Update Ticket #{ticket.ticketId}
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        {/* OUTER BORDER BOX (Image style) */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 2,
            height: '100%',
            width: '100%'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ fontWeight: 600, mb: 1 ,width: '100%'}}>
              <TextField
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                fullWidth
                label="Subject"
              />
            </Grid>

            <Grid item xs={12} sm={6}sx={{ fontWeight: 600, mb: 1 ,width: '100%'}}>
              <TextField
                label="Type"
                value={ticket.ticketType}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}sx={{ fontWeight: 600, mb: 1 ,width: '100%'}}>
              <TextField
                label="Sub-Type"
                value={ticket.subType}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}sx={{ fontWeight: 600, mb: 1 ,width: '100%'}}>
              <TextField
                label="Agent"
                value={ticket.createdByName}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}sx={{ fontWeight: 600, mb: 1 ,width: '100%'}}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ fontWeight: 600, mb: 1 ,width: '100%'}}>
              <TextField
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                label="Description"
              />
            </Grid>

            {/* IMAGE STYLE ATTACH BUTTON */}
            {/* <Grid item xs={12}>
              <Button
                component="label"
                startIcon={<AttachFileIcon />}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#43a047" },
                }}
              >
                Click to attach file
                <input hidden type="file" />
              </Button>
            </Grid> */}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? <CircularProgress size={22} /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTickets;
