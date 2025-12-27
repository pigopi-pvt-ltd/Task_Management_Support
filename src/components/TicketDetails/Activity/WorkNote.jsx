import { Box, Typography, Paper, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const activities = [
  {
    status: "Closed",
    title: "L1 - GHD",
    user: "GHD_APP_USER(GHD_APP_USER)",
    message: "The ticket has been auto hard closed",
    duration: "0 Hr",
    actionedOn: "07 Nov 2025 3:00 AM",
    assignedOn: "07 Nov 2025 3:00 AM",
  },
  {
    status: "Resolved",
    title: "L2 - GHD",
    user: "GHD_APP_USER(GHD_APP_USER)",
    message: "The ticket has been auto resolved",
    duration: "44 Hr",
    actionedOn: "03 Nov 2025 6:53 AM",
    assignedOn: "03 Nov 2025 6:26 AM",
  },
];

const WorkNote = () => {
  return (
    <Box>
      <Box mt={2}>
        {activities.map((item, index) => (
          <Stack direction="row" key={index} spacing={2} mb={0.5}>
            {/* Timeline */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CheckCircleIcon color="success" />
              <Box
                sx={{
                  width: "2px",
                  flex: 1,
                  bgcolor: "success.main",
                }}
              />
            </Box>

            {/* Card */}
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                flex: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 3,
              }}
            >
              {/* Header */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ backgroundColor: "#eff3f3ff",borderRadius: 1, p: 1, mb: 1 }}
              >
                <Box>
                  <Typography fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="success.main"
                    fontWeight={500}
                  >
                    {item.status}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={4}>
                  <Meta label="Activity Duration" value={item.duration} />
                  <Meta label="Actioned on" value={item.actionedOn} />
                  <Meta label="Assigned on" value={item.assignedOn} />
                </Stack>
              </Stack>

              {/* Body */}
              {item.user && (
                <>
                  {/* <Divider sx={{ my: 1}} /> */}
                  <Typography fontWeight={600} variant="body2">
                    {item.user}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.message}
                  </Typography>
                </>
              )}
            </Paper>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

const Meta = ({ label, value }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

export default WorkNote;
