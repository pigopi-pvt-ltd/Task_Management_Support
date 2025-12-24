import { Box, Typography, Divider, Stack, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const WorkNote = ({ notes = [] }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, mt: 1 }}>
      {notes && notes.length > 0 ? (
        notes.map((item, index) => (
          <Box key={index} sx={{ "&:not(:last-child)": { mb: 2 } }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon color="success" fontSize="small" />
              <Typography fontWeight={600}>
                {item.ticketId} - {item.status}
              </Typography>
            </Stack>

            <Typography
              sx={{ ml: 3, mt: 0.5 }}
              color="text.secondary"
              variant="body2"
            >
              {item.message}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 1, ml: 3 }}
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

            {index !== notes.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))
      ) : (
        <Typography>No work notes available for this ticket.</Typography>
      )}
    </Paper>
  );
};

export default WorkNote;
