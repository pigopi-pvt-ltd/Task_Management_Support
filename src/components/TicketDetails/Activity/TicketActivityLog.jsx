import { Box, Typography, Paper, Stack, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import WorkNote from "./WorkNote";

function TicketActivityLog({ ticket }) {
  const [value, setValue] = useState(0);

  if (!ticket) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          minHeight: 36,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            minHeight: 36,
          },
        }}
      >
        <Tab label="Work Note" />
        <Tab label="Activity Log" />
      </Tabs>
      {value === 0 && <WorkNote notes={ticket.notes} />}
      {value === 1 && (
        <Paper sx={{ p: 2, borderRadius: 2, mt: 1 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Ticket Created
              </Typography>
              <Typography variant="caption" color="text.secondary">
                by {ticket.createdByName || "Unknown"} on{" "}
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleString()
                  : "N/A"}
              </Typography>
            </Box>

            {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ticket Updated
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  by {ticket.updatedByName || "Unknown"} on{" "}
                  {new Date(ticket.updatedAt).toLocaleString()}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Current Status
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ticket.status
                  ? ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)
                  : "Pending"}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default TicketActivityLog;