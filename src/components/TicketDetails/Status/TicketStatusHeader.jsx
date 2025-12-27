import { Box, Typography, Button, Stack } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import EditIcon from "@mui/icons-material/Edit";

function TicketStatusHeader({ ticket, onOpenUpdateModal }) {
  if (!ticket) return null;

  const statusColor = {
    pending: "warning.main",
    "in-progress": "info.main",
    resolved: "success.main",
    closed: "error.main",
  };

  const priorityColor = {
    low: "success.main",
    medium: "warning.main",
    high: "error.main",
  };

  const loggedDate = new Date(ticket.createdAt);
  const formattedDate = `${loggedDate.getDate()} ${loggedDate.toLocaleString(
    "en-US",
    {
      month: "short",
    }
  )} ${loggedDate.getFullYear()}`;
  const formattedTime = loggedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

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
        <Stack spacing={0.5} direction="row" alignItems="center" gap={4}>
          <Stack>
            {/* Ticket No */}
            <Typography fontSize={14} fontWeight={600}>
              TICKET No.{" "}
              <Typography
                component="span"
                color="success.main"
                fontWeight={700}
              >
                {ticket.ticketId}
              </Typography>
            </Typography>

            {/* Logged Date */}
            <Typography fontSize={12} color="text.secondary">
              logged on {formattedDate} {formattedTime}
            </Typography>
          </Stack>

          {/* Meta Row */}
          {/* <Stack direction="row" spacing={3} mt={0.5}> */}
          {/* Status */}
          <Stack spacing={0}>
            <Typography fontSize={11} color="text.secondary">
              Status
            </Typography>
            <Typography
              fontSize={13}
              fontWeight={600}
              color={statusColor[ticket.status] || "default"}
            >
              {ticket.status}
            </Typography>
          </Stack>

          {/* Priority */}
          <Stack spacing={0}>
            <Typography fontSize={11} color="text.secondary">
              Priority
            </Typography>
            <Typography
              fontSize={13}
              fontWeight={600}
              color={priorityColor[ticket.priority] || "default"}
            >
              {ticket.priority}
            </Typography>
          </Stack>

          {/* SLA */}
          <Stack spacing={0}>
            <Typography fontSize={11} color="text.secondary">
              Customer SLA
            </Typography>
            <Typography fontSize={13} fontWeight={600}>
              N/A
            </Typography>
          </Stack>

          {/* SLA Status */}
          <Stack spacing={0}>
            <Typography fontSize={11} color="text.secondary">
              SLA Status
            </Typography>
            <Typography fontSize={13} fontWeight={600} color="success.main">
              N/A
            </Typography>
          </Stack>
          {/* </Stack> */}
        </Stack>

        {/* RIGHT SIDE */}
        <Stack direction="row" spacing={1}>
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
          {/* <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            sx={{
              textTransform: "none",
              fontSize: 12,
              height: 32,
            }}
            onClick={onOpenUpdateModal}
          >
            Update Ticket
          </Button> */}
        </Stack>
      </Box>
    </Box>
  );
}

export default TicketStatusHeader;
