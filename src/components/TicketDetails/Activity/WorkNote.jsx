import {
  Box,
  Typography,
  Divider,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const statusColorMap = {
  Closed: "success",
  Resolved: "info",
  Pending: "warning",
};

const WorkNote = ({ notes = [] }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, mt: 1 }}>
      {notes.length > 0 ? (
        notes.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{ position: "relative", pb: 3 }}
          >
            {/* Timeline */}
            <Box sx={{ position: "relative" }}>
              <CheckCircleIcon color="success" fontSize="small" />
              {index !== notes.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    width: "2px",
                    height: "100%",
                    bgcolor: "success.light",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600}>
                  {item.ticketId}
                </Typography>

                <Chip
                  size="small"
                  label={item.status}
                  color={statusColorMap[item.status] || "default"}
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {item.message}
              </Typography>

              <Stack
                direction="row"
                spacing={3}
                sx={{ mt: 1 }}
                flexWrap="wrap"
              >
                <Typography variant="caption">
                  <b>Activity Duration:</b> {item.duration}
                </Typography>
                <Typography variant="caption">
                  <b>Actioned on:</b> {item.actionedOn}
                </Typography>
                <Typography variant="caption">
                  <b>Assigned on:</b> {item.assignedOn}
                </Typography>
              </Stack>

              {index !== notes.length - 1 && (
                <Divider sx={{ mt: 2 }} />
              )}
            </Box>
          </Stack>
        ))
      ) : (
        <Typography>No work notes available.</Typography>
      )}
    </Paper>
  );
};

export default WorkNote;
