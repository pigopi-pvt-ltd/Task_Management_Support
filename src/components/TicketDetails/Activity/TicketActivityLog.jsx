import { Box, Typography, Paper, Stack } from "@mui/material";


function TicketActivityLog() {
return (
<Box>
<Typography fontWeight={600} mb={1}>Activity Log</Typography>


<Paper sx={{ p: 2, borderRadius: 2 }}>
<Stack spacing={1}>
<Typography variant="body2">L1 - GHD | Closed</Typography>
<Typography variant="caption" color="text.secondary">
Actioned on: 07 Nov 2025 3:00 AM
</Typography>
</Stack>
</Paper>
</Box>
);
}