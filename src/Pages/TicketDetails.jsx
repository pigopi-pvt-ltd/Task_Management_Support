import React from "react";
import { Box, Grid } from "@mui/material";
import TicketStatusHeader from "./TicketStatusHeader";
import TicketInfoPanel from "./TicketInfoPanel";
import TicketComments from "./TicketComments";
import TicketActivityLog from "./TicketActivityLog";


function TicketDetails() {
return (
<Box sx={{ p: 2, bgcolor: "#f5f7eb" }}>
<TicketStatusHeader />


<Grid container spacing={2} mt={1}>
<Grid item xs={12} md={4}>
<TicketInfoPanel />
</Grid>
<Grid item xs={12} md={8}>
<TicketComments />
</Grid>
</Grid>


<Box mt={2}>
<TicketActivityLog />
</Box>
</Box>
);
}


// export default TicketActivityLog;


export default TicketDetails;