import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, CircularProgress, Typography, Button } from "@mui/material";
import TicketStatusHeader from "../components/TicketDetails/Status/TicketStatusHeader";
import TicketInfoPanel from "../components/TicketDetails/Left Section/TicketInfoPanel";
import TicketActivityLog from "../components/TicketDetails/Activity/TicketActivityLog";
import TicketComments from "../components/TicketDetails/Comments/TicketComments";
import axiosInstance from "../utils/axiosInstance";
import UpdateTickets from "../components/Tickets/UpdateTickets";
import Snackbar from "../components/Snackbar/Snackbar";

function TicketDetails() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/tickets/${ticketId}`);
      setTicket(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch ticket details:", err);
      setError("Failed to load ticket details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  const handleOpenUpdateModal = () => setUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setUpdateModalOpen(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleTicketUpdate = () => {
    fetchTicketDetails(); // Refetch ticket details
  };

  if (loading && !ticket) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 0, bgcolor: "#f5f7eb" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Box sx={{ p: 0, bgcolor: "#f5f7eb" }}>
        <Typography variant="h6">No ticket data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0, bgcolor: "#f5f7eb" }}>
      <TicketStatusHeader
        ticket={ticket}
        onOpenUpdateModal={handleOpenUpdateModal}
      />

      <Box display="flex" gap={2}>
        <Box width="25%">
          <TicketInfoPanel ticket={ticket} />
        </Box>

        <Box width="75%">
          <TicketComments ticket={ticket} />
          <Box mt={2}>
            <TicketActivityLog ticket={ticket} />
          </Box>
        </Box>
      </Box>

      <UpdateTickets
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        ticket={ticket}
        onUpdated={handleTicketUpdate}
        onUpdateSuccess={(message) => {
          setSnackbarMessage(message);
          setSnackbarOpen(true);
        }}
        onUpdateError={(message) => {
          setSnackbarMessage(message);
          setSnackbarOpen(true);
        }}
      />
      <Snackbar
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={
          snackbarMessage.includes("successfully") ? "success" : "error"
        }
      />
    </Box>
  );
}

export default TicketDetails;
