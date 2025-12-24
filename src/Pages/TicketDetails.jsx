import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import TicketStatusHeader from "../components/TicketDetails/Status/TicketStatusHeader";
import TicketInfoPanel from "../components/TicketDetails/Left Section/TicketInfoPanel";
import TicketComments from "../components/TicketDetails/Comments/TicketComments";
import TicketActivityLog from "../components/TicketDetails/Activity/TicketActivityLog";
import axiosInstance from "../utils/axiosInstance";

function TicketDetails() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  if (loading) {
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
      <TicketStatusHeader ticket={ticket} />

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <TicketInfoPanel ticket={ticket} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ maxWidth: '800px' }}>
            <TicketComments ticket={ticket} />
            <Box mt={2}>
              <TicketActivityLog ticket={ticket} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TicketDetails;