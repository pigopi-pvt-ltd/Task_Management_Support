import { Box, Typography, Divider } from "@mui/material";


function TicketInfoPanel() {
return (
<Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2 }}>
<Typography fontWeight={600} mb={1}>Ticket Details</Typography>


<Typography variant="caption" color="text.secondary">Description</Typography>
<Typography variant="body2" mb={1}>
Unable to connect Global Protect due to browser issue.
</Typography>


<Divider sx={{ my: 1 }} />


<InfoRow label="Catalog" value="Internal IT Services" />
<InfoRow label="Item" value="Software Services" />
<InfoRow label="Issue" value="Browser Related Issues" />
<InfoRow label="Location" value="PTI New Delhi" />
<InfoRow label="Branch" value="TCS New Delhi" />
<InfoRow label="Asset ID" value="01HW2112186" />
<InfoRow label="Account Locked" value="No" />
</Box>
);
}


export default TicketInfoPanel;


function InfoRow({ label, value }) {
return (
<Box mb={0.5}>
<Typography variant="caption" color="text.secondary">{label}</Typography>
<Typography variant="body2">{value}</Typography>
</Box>
);
}