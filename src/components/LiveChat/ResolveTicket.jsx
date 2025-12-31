import { Avatar, Button, Grid, Typography, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../../utils/auth";
import * as socketFunctions from "../../utils/sockets/socketManagement.js";
import { useCloseChatTicket } from "../../services/mutations.js";
import { setLoader } from "../../store/slices/loaderSlice.js";

const ResolveTicket = ({ chatTicketID }) => {
  const theme = useTheme();
  const { userInfo, roomId } = useSelector(
    (state) => state.chatSupport.liveChatRoomInfo
  );
  const currentUserData = getCurrentUserData();
  // const

  // const socket = socketFunctions.getSocket()
  const chatClosedData = {
    roomId: roomId,
    userId: userInfo.userId,
  };
  const { mutate, isPending, isError, error } =
    useCloseChatTicket(chatClosedData);
  const dispatch = useDispatch();

  const handleCloseTicket = () => {
    let closedBy = currentUserData._id;
    let obj = {
      closedBy,
      closedDate: Date.now(),
      closedByType: "Support Agent",
      chatTicketID,
    };
    // console.log("obj----", obj);
    mutate(obj);
  };

  if (isError) {
    console.log("error---", error);
  }

  dispatch(
    setLoader({
      loading: isPending,
    })
  );
  return (
    <>
      {userInfo && (
        <Grid container size={4}>
          <Grid
            container
            flexDirection={"column"}
            size={12}
            bgcolor={"#faf8fc"}
            boxShadow={3}
            borderRadius={"0.7rem"}
            p={2}
          >
            <Grid id="title">
              <Typography variant="h5">User Info</Typography>
            </Grid>
            <Grid mt={2} id="user-info" container justifyContent={"center"}>
              <Avatar
                sx={{
                  height: "5em",
                  width: "5em",
                  // fontSize: "3em",
                }}
              >
                <PersonIcon
                  sx={{
                    fontSize: "3em",
                  }}
                />
              </Avatar>
            </Grid>
            <Typography textAlign={"center"} variant="h6">
              {userInfo.username}
            </Typography>
            <Grid mt={2} container justifyContent={"center"}>
              <Button
                onClick={handleCloseTicket}
                variant="outlined"
                color="error"
              >
                Close Ticket / Issue Resolved
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ResolveTicket;
