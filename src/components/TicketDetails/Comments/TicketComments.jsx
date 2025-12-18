import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


function TicketComments() {
return (
<Box sx={{ bgcolor: "#000", color: "#fff", p: 3, borderRadius: 2 }}>
<Box display="flex" alignItems="center" gap={1} mb={1}>
<CheckCircleIcon color="success" />
<Typography fontWeight={600}>Closed</Typography>
</Box>


<Typography variant="caption" color="gray">
by KUMAR REDDY KAPPETA (2270341)
</Typography>


<Typography variant="body2" mt={2}>
Solution Provided: After updating GP, issue is resolved.
Ticket closed with user confirmation.
</Typography>
</Box>
);
}


export default TicketComments;