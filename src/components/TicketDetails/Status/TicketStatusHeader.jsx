import { Box, Typography, Button, Stack } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function TicketStatusHeader({ ticket }) {
  if (!ticket) return null;

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        px: 3,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE */}
        <Stack spacing={0.5}>
          {/* Ticket No */}
          <Typography fontSize={14} fontWeight={600}>
            Ticket No.{" "}
            <Typography component="span" color="success.main" fontWeight={700}>
              {ticket.id}
            </Typography>
          </Typography>

          {/* Logged Date */}
          <Typography fontSize={12} color="text.secondary">
            logged on {ticket.loggedAt}
          </Typography>

          {/* Meta Row */}
          <Stack direction="row" spacing={3} mt={0.5}>
            {/* Status */}
            <Stack spacing={0}>
              <Typography fontSize={11} color="text.secondary">
                Status
              </Typography>
              <Typography fontSize={13} fontWeight={600} color="success.main">
                Closed
              </Typography>
            </Stack>

            {/* Priority */}
            <Stack spacing={0}>
              <Typography fontSize={11} color="text.secondary">
                Priority
              </Typography>
              <Typography fontSize={13} fontWeight={600} color="warning.main">
                Medium
              </Typography>
            </Stack>

            {/* SLA */}
            <Stack spacing={0}>
              <Typography fontSize={11} color="text.secondary">
                Customer SLA
              </Typography>
              <Typography fontSize={13} fontWeight={600}>
                11 Nov 2025 10:00 AM
              </Typography>
            </Stack>

            {/* SLA Status */}
            <Stack spacing={0}>
              <Typography fontSize={11} color="text.secondary">
                SLA Status
              </Typography>
              <Typography fontSize={13} fontWeight={600} color="success.main">
                Within SLA
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* RIGHT SIDE */}
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopyOutlinedIcon />}
          sx={{
            textTransform: "none",
            fontSize: 12,
            height: 32,
          }}
        >
          Clone
        </Button>
      </Box>
    </Box>
  );
}

export default TicketStatusHeader;
