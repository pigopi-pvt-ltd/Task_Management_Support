import {
  Avatar,
  Button,
  Grid,
  Typography,
  useTheme,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../../utils/auth";
import { useCloseChatTicket } from "../../services/mutations.js";
import { setLoader } from "../../store/slices/loaderSlice.js";
import { useEffect } from "react";

const ResolveTicket = ({ chatTicketID }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userInfo, roomId } = useSelector(
    (state) => state.chatSupport.liveChatRoomInfo
  );
  const currentUserData = getCurrentUserData();

  const chatClosedData = {
    roomId: roomId,
    userId: userInfo?.userId,
  };

  const { mutate, isPending, isError, error } =
    useCloseChatTicket(chatClosedData);

  // Sync loader with mutation state
  useEffect(() => {
    dispatch(setLoader({ loading: isPending }));
  }, [isPending, dispatch]);

  const handleCloseTicket = () => {
    let closedBy = currentUserData._id;
    let obj = {
      closedBy,
      closedDate: Date.now(),
      closedByType: "Support Agent",
      chatTicketID,
    };
    mutate(obj);
  };

  if (!userInfo) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #e0e0e0",
        bgcolor: "#fff",
        overflowX: "hidden",
        // overflowY: "auto",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0", bgcolor: "#fafafa" }}>
        <Typography variant="subtitle1" fontWeight="700">
          Customer Profile
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* User Identity Section */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              sx={{
                height: 64,
                width: 64,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                border: "2px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <PersonIcon sx={{ fontSize: 32 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
              {userInfo.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              User ID: {userInfo.userId?.substring(0, 8)}...
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5, borderStyle: "dashed" }} />

        {/* Details List */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Organization
            </Typography>
            <Typography variant="body2" fontWeight="500">
              {userInfo.organizationId || "N/A"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Branch ID
            </Typography>
            <Typography variant="body2" fontWeight="500">
              {userInfo.branchId || "Main"}
            </Typography>
          </Box>
        </Box>

        {/* Action Button */}
        <Button
          fullWidth
          onClick={handleCloseTicket}
          variant="contained"
          disableElevation
          startIcon={<CheckCircleOutlineIcon />}
          sx={{
            py: 1.2,
            borderRadius: 2,
            bgcolor: "#fff1f0", // Very light red
            color: "#f5222d", // Primary red
            fontWeight: "700",
            border: "1px solid #ffa39e",
            "&:hover": {
              bgcolor: "#f5222d",
              color: "#fff",
              borderColor: "#f5222d",
            },
            textTransform: "none",
            fontSize: "0.9rem",
          }}
        >
          Resolve & Close Ticket
        </Button>

        {isError && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 1, display: "block", textAlign: "center" }}
          >
            Error: {error?.message || "Could not close ticket"}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ResolveTicket;
