import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TicketComments({ ticket }) {
  if (!ticket) return null;

  return (
    <Box sx={{ p: 0, }}>
      {/* BLACK COMMENT HEADER CARD */}
      <Paper
        elevation={1}
        sx={{
          bgcolor: "#000",
          color: "#fff",
          borderRadius: 0.5,
          p: 2,
          minHeight: "250px",
          height: "auto",
        }}
      >
        {/* HEADER ROW */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 36,
              color: "#fff",
              mr: 2,
            }}
          />

          <Box>
            <Typography fontWeight={600}>Closed</Typography>

            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              by {ticket.closedBy || "KUMAR REDDY KAPPETA"} (
              {ticket.empId || "2270341"})
            </Typography>
          </Box>
        </Box>

        {/* COMMENTS TITLE */}
        <Typography fontWeight={600} mb={1}>
          Comments
        </Typography>

        {/* COMMENTS TEXT */}
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {ticket.comments ||
            `Dear Associate, This is regarding the status of your ticket.
Solution Provided: After updated GP issue is resolved.
Hence closing the ticket with user confirmation.

Thank you for your co-operation.`}
        </Typography>
      </Paper>
    </Box>
  );
}

export default TicketComments;
