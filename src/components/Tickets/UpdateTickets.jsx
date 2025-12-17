import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';

const UpdateTickets = ({ open, onClose, ticket, onUpdated, onUpdateSuccess, onUpdateError }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      setFormData({
        subject: ticket.subject || '',
        description: ticket.description || '',
        status: ticket.status || '',
      });
    }
  }, [ticket]);

  if (!ticket) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        subject: formData.subject,
        description: formData.description,
        status: formData.status,
      };
      await axiosInstance.put(`/supportUsers/update-ticket?id=${ticket.id}`, payload);
      if (onUpdateSuccess) {
        onUpdateSuccess('Ticket updated successfully!');
      }
      if (onUpdated) {
        onUpdated();
      }
      onClose();
    } catch (error) {
      console.error('Failed to update ticket:', error);
      if (onUpdateError) {
        onUpdateError(error.response?.data?.message || 'Failed to update ticket');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Update Ticket #{ticket.id}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="subject"
                label="Ticket Subject"
                value={formData.subject}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                defaultValue={ticket.ticketType}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sub-Type"
                defaultValue={ticket.subType}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Agent"
                defaultValue={ticket.createdByName}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inprogress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateTickets;
