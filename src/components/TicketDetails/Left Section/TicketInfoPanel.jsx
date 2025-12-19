// import { Box, Typography, Divider } from "@mui/material";

// function TicketInfoPanel({ ticket }) {
//   if (!ticket) return null;

//   return (
//     <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2 }}>
//       <Typography fontWeight={600} mb={1}>
//         Ticket Details
//       </Typography>

//       <Typography variant="caption" color="text.secondary">
//         Description
//       </Typography>
//       <Typography variant="body2" mb={1}>
//         {ticket.description || "No description available"}
//       </Typography>

//       <Divider sx={{ my: 1 }} />

//       <InfoRow label="Subject" value={ticket.subject || "N/A"} />
//       <InfoRow label="Type" value={ticket.ticketType || "N/A"} />
//       <InfoRow label="Sub-Type" value={ticket.subType || "N/A"} />
//       <InfoRow label="Organization" value={ticket.organizationName || "N/A"} />
//       <InfoRow label="Branch" value={ticket.branchName || "N/A"} />
//       <InfoRow label="Status" value={ticket.status || "N/A"} />
//       <InfoRow
//         label="Created Date"
//         value={ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}
//       />
//       <InfoRow
//         label="Created By"
//         value={ticket.createdByName || "N/A"}
//       />
//       <InfoRow
//         label="Updated Date"
//         value={ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : "N/A"}
//       />
//       <InfoRow
//         label="Updated By"
//         value={ticket.updatedByName || "N/A"}
//       />
//     </Box>
//   );
// }

// export default TicketInfoPanel;

// function InfoRow({ label, value }) {
//   return (
//     <Box mb={0.5}>
//       <Typography variant="caption" color="text.secondary">
//         {label}
//       </Typography>
//       <Typography variant="body2">{value}</Typography>
//     </Box>
//   );
// }

import { Box, Typography, Divider, Link } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

function TicketInfoPanel({ ticket }) {
  if (!ticket) return null;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography fontWeight={600} fontSize={14}>
          Ticket Details
        </Typography>

        <Link
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: 12,
            color: "#2e7d32",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <CommentOutlinedIcon fontSize="small" />
          My Comments
        </Link>
      </Box>

      {/* Description */}
      <Label>Description</Label>
      <Value>
        {ticket.description || "No description available"}
      </Value>

      <Divider sx={{ my: 1 }} />

      {/* Catalog / Item */}
      <TwoColRow
        leftLabel="Catalog"
        leftValue={ticket.catalog || "Internal IT Services"}
        rightLabel="Item"
        rightValue={ticket.item || "Software Services"}
      />

      {/* Issue Faced */}
      <Box mt={1}>
        <Label>Issue Faced in</Label>
        <Value>{ticket.issueFacedIn || "Browser Related Issues"}</Value>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Location / Branch */}
      <TwoColRow
        leftLabel="Location"
        leftValue={ticket.location || "PTI - New - PTI Building, New Delhi"}
        rightLabel="Branch"
        rightValue={ticket.branchName || "TCS - New Delhi"}
      />

      <Divider sx={{ my: 1 }} />

      {/* Preferred Time / Asset / Account Locked */}
      <TwoColRow
        leftLabel="Preferred Time for Helpdesk Call"
        leftValue={ticket.preferredTime || "2 PM to 8 PM"}
        rightLabel="Asset ID"
        rightValue={ticket.assetId || "01HW2112186"}
      />

      <Box mt={1}>
        <Label>Account Locked?</Label>
        <Value>{ticket.accountLocked ? "Yes" : "No"}</Value>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* User Details */}
      <Label>User Details</Label>
      <Value>{ticket.createdByName || "—"}</Value>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
        <Typography fontSize={11} color="text.secondary">
          🕒
        </Typography>
        <Typography fontSize={11} color="text.secondary">
          {ticket.createdAt
            ? new Date(ticket.createdAt).toLocaleString()
            : "—"}
        </Typography>
      </Box>
    </Box>
  );
}

export default TicketInfoPanel;

/* ---------- Reusable Components ---------- */

function Label({ children }) {
  return (
    <Typography
      fontSize={11}
      color="text.secondary"
      sx={{ mb: 0.25 }}
    >
      {children}
    </Typography>
  );
}

function Value({ children }) {
  return (
    <Typography fontSize={13} sx={{ mb: 0.5 }}>
      {children}
    </Typography>
  );
}

function TwoColRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 2,
      }}
    >
      <Box>
        <Label>{leftLabel}</Label>
        <Value>{leftValue}</Value>
      </Box>

      <Box>
        <Label>{rightLabel}</Label>
        <Value>{rightValue}</Value>
      </Box>
    </Box>
  );
}
