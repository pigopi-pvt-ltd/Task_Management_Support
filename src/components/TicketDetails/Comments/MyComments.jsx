import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

// Styles for the modal content
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 640, // Corresponds to max-w-xl
  bgcolor: "background.paper",
  borderRadius: 1, // Corresponds to rounded-md
  boxShadow: 24,
};

const MyComments = ({ onClose }) => {
  return (
    <Modal
      open={true} // The modal is open because it's conditionally rendered
      onClose={onClose}
      aria-labelledby="my-comments-title"
    >
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon sx={{ color: "text.secondary" }} />
            <Typography id="my-comments-title" variant="h6" component="h2" fontSize={18} fontWeight="600">
              My Comments
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ p: 2, minHeight: 220, bgcolor: "#f7f7f7" }}>
          <Paper
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1.5,
              boxShadow: "sm",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Please look issue on very high priority.
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", mt: 0.5, display: "block" }}
            >
              03 Nov 2025 6:27 PM
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
};

export default MyComments;
