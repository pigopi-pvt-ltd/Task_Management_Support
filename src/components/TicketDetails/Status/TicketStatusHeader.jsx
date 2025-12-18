import { Box, Typography, Chip, Stack } from "@mui/material";


function TicketStatusHeader() {
return (
<Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2 }}>
<Stack direction="row" spacing={2} alignItems="center">
<Typography fontWeight={600}>Ticket No. 106536415</Typography>
<Chip label="Closed" color="success" size="small" />
<Chip label="Medium" color="warning" size="small" />
<Chip label="Within SLA" color="info" size="small" />
</Stack>
</Box>
);
}


export default TicketStatusHeader;