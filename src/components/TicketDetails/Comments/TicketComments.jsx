// import { Box, Typography, Paper } from "@mui/material";

// function TicketComments({ ticket }) {
//   if (!ticket) return null;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "closed":
//         return "✓";
//       case "inprogress":
//         return "⟳";
//       default:
//         return "●";
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: 2 }}>
//       <Paper sx={{ p: 2, bgcolor: "#fff" }}>
//         <Typography variant="h6" fontWeight={600} mb={1}>
//           {getStatusIcon(ticket.status)} {ticket.subject}
//         </Typography>

//         <Typography variant="caption" color="text.secondary" display="block" mb={2}>
//           by {ticket.createdByName || "Unknown"} | Created: {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "N/A"}
//         </Typography>

//         <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
//           {ticket.description || "No comments available"}
//         </Typography>

//         {ticket.attachments && ticket.attachments.length > 0 && (
//           <>
//             <Typography variant="caption" color="text.secondary" display="block" mt={2} mb={1}>
//               Attachments:
//             </Typography>
//             {ticket.attachments.map((attachment, index) => (
//               <Typography key={index} variant="caption" component="a" href={attachment} target="_blank" rel="noopener noreferrer" sx={{ display: "block", color: "#1976d2", textDecoration: "underline" }}>
//                 {attachment.split("/").pop()}
//               </Typography>
//             ))}
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default TicketComments;

import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TicketComments({ ticket }) {
  if (!ticket) return null;

  return (
    <Box sx={{ p: 0, width: "100%" }}>
      {/* BLACK COMMENT HEADER CARD */}
      <Paper
        elevation={1}
        sx={{
          bgcolor: "#000",
          color: "#fff",
          borderRadius: 2,
          p: 2,
          minHeight: "250px",
          height: "auto",
          width: "600px",
        }}
      >
        {/* HEADER ROW */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 36,
              color: "#fff",
              mr: 2,
            }}
          />

          <Box>
            <Typography fontWeight={600}>
              Closed
            </Typography>

            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              by {ticket.closedBy || "KUMAR REDDY KAPPETA"} ({ticket.empId || "2270341"})
            </Typography>
          </Box>
        </Box>

        {/* COMMENTS TITLE */}
        <Typography fontWeight={600} mb={1}>
          Comments
        </Typography>

        {/* COMMENTS TEXT */}
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {ticket.comments ||
            `Dear Associate, This is regarding the status of your ticket.
Solution Provided: After updated GP issue is resolved.
Hence closing the ticket with user confirmation.

Thank you for your co-operation.`}
        </Typography>
      </Paper>
    </Box>
  );
}

export default TicketComments;
