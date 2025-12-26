import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Slide,
  useTheme,
} from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Optional: Adds a smooth slide-up transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScreenShareRequestModal = ({
  open,
  customerName,
  onAccept,
  onDecline,
  share,
}) => {
  // const theme = useTheme();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ zIndex: (theme) => theme.zIndex.modal + 100 }}
      onClose={onDecline}
      aria-labelledby="screen-share-request-title"
      PaperProps={{
        sx: {
          borderRadius: 3,

          padding: 1,
          maxWidth: "400px",
        },
      }}
    >
      <DialogTitle
        id="screen-share-request-title"
        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <Avatar sx={{ bgcolor: "primary.light" }}>
          <ScreenShareIcon />
        </Avatar>
        <Typography variant="h6">Screen Share Request</Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" gutterBottom>
            <strong>{customerName || "The customer"}</strong> wants to share
            their {share} with you.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "amber.50",
              p: 1.5,
              borderRadius: 2,
              mt: 2,
              border: "1px solid",
              borderColor: "amber.200",
            }}
          >
            <WarningAmberIcon sx={{ color: "amber.800", fontSize: 20 }} />
            {share == "screen" && (
              <Typography variant="caption" sx={{ color: "amber.900" }}>
                Accepting will open a live video stream of their desktop.
              </Typography>
            )}
            {share == "audio" && (
              <Typography variant="caption" sx={{ color: "amber.900" }}>
                Accepting will let user share his audio.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onDecline}
          color="error"
          variant="text"
          sx={{ fontWeight: "bold" }}
        >
          Decline
        </Button>
        <Button
          onClick={onAccept}
          variant="contained"
          color="primary"
          autoFocus
          sx={{ px: 4, borderRadius: 2, fontWeight: "bold" }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScreenShareRequestModal;
