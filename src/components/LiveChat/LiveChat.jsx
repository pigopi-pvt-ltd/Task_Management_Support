import {
  Avatar,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import {
  useGetAssignedTicket,
  useGetChatHistory,
} from "../../services/queries";
import { useEffect, useState } from "react";

import * as socketFunctions from "../../utils/sockets/socketManagement.js";
// import ChatMessageTo from "./ChatMessageFromEmployee.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeMessages,
  setLiveChatRoomInfo,
  setRoomMessage,
} from "../../store/slices/chatSupportSlice.js";
// import ChatMessageFrom from "./ChatMessageFromUser.jsx";
import ChatMessageFromUser from "./ChatMessageFromUser.jsx";
import ChatMessageFromEmployee from "./ChatMessageFromEmployee.jsx";

const LiveChat = () => {
  // will get assigned ticket

  const theme = useTheme();
  let token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const { data, isError, error, isLoading, isSuccess } = useGetAssignedTicket(
    token,
    page
  );
  if (isError) {
    console.log("error---", error);
  }
  let droomId = null;
  if (data) {
    console.log("data from assigned ticket---", data);
    droomId = data.assignedTicket.chatRoom;
  }
  const { messages, chatRoom, userInfo } = useSelector(
    (state) => state.chatSupport.liveChatRoomInfo
  );
  const dispatch = useDispatch();
  const [getHistory, setGetHistoryNow] = useState(false);
  const {
    data: chatHistoryMessages,
    isError: isHistoryError,
    error: HistoryError,
    isLoading: isHistoryLoading,
  } = useGetChatHistory(token, chatRoom, getHistory);
  if (isHistoryError) {
    console.log("history error---", HistoryError);
  }
  useEffect(() => {
    if (data) {
      console.log("data from assigned ticket---", data);
      dispatch(
        setLiveChatRoomInfo({
          chatRoom: data.assignedTicket.chatRoom,
          userInfo: {
            organizationId: data.assignedTicket.organizationId,
            branchId: data.assignedTicket.branchId,
            userId: data.assignedTicket.createdBy,
          },
        })
      );
      if (isSuccess) {
        setGetHistoryNow(true);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (chatHistoryMessages) {
      console.log("fvvfv", chatHistoryMessages);
      dispatch(
        initializeMessages({
          messages: chatHistoryMessages.messages,
        })
      );
    }
  }, [isHistoryLoading]);

  const socket = socketFunctions.getSocket();
  const handleSendMessage = () => {
    if (messageValue.trim().length == 0) {
      return;
    }
    let messageData = {
      organizationId: data.assignedTicket.organizationId,
      branchId: data.assignedTicket.branchId,
      from: data.assignedTicket.assignedTo,
      to: data.assignedTicket.createdBy,
      message: messageValue.trim(),
      chatRoom: data.assignedTicket.chatRoom,
      userId: data.assignedTicket.createdBy,
    };
    socket.emit("join_room", {
      roomId: data.assignedTicket.chatRoom,
    });

    socket.emit("new_message", messageData);
    // dispatch(
    //   setRoomMessage({
    //     message: messageData,
    //   })
    // );
  };

  const [messageValue, setMessageValue] = useState("");

  // const [messages, setMessages] = useState([]);

  return (
    <>
      {data && (
        <Grid
          container
          sx={
            {
              // height: "90vh",
            }
          }
          p={2}
          // mb={5}
          // justifyContent={''}
          // alignItems={"center"}
        >
          <Grid
            boxShadow={3}
            borderRadius={"0.7rem"}
            bgcolor={"#faf8fc"}
            container
            size={8}
            sx={{
              // flexDirection: "column",
              height: "85vh",
            }}
          >
            <Grid
              borderBottom={1}
              borderColor={theme.palette.grey[700]}
              p={2}
              size={12}
              container
              // mb={3}
              alignItems={"center"}
              px={2}
              sx={
                {
                  // height: "15%",
                }
              }
            >
              <Grid flexGrow={1}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  User: {data.assignedTicket.createdByName}
                </Typography>
                <Typography variant="subtitle2" color="success">
                  online
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle1">
                  Issue:{" "}
                  <span
                    style={{
                      fontWeight: "medium",
                    }}
                  >
                    {data.assignedTicket.ticketType.replaceAll("_", " ")}
                  </span>
                </Typography>
                <Typography variant="subtitle1">
                  Status:{" "}
                  <span
                    style={{
                      fontWeight: "medium",
                    }}
                  >
                    {data.assignedTicket.status}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              id="chat-window"
              container
              size={12}
              // flexGrow={1}
              sx={{
                height: "70%",

                overflowY: "scroll",
                // 1. Define the width of the scrollbar
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                // 2. Style the track (the background)
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                // 3. Style the thumb (the draggable part)
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.grey[600], // Light grey
                  borderRadius: "10px",
                },
                // Optional: Darken on hover
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#b0b0b0",
                },
              }}
            >
              <Grid
                sx={{
                  height: "fit-content",
                }}
                size={12}
                container
                spacing={1}
                // m={1}
                // id="to"
                // ml={"auto"}
                p={2}
              >
                {messages.length > 0 &&
                  messages.map((message, index) => {
                    // return (
                    //   <ChatMessageTo key={index} message={message.message} />
                    // );
                    return message.from == "support_employee" ||
                      message.from == data.assignedTicket.assignedTo ? (
                      <ChatMessageFromEmployee
                        key={index}
                        message={message.message}
                      />
                    ) : (
                      <ChatMessageFromUser
                        key={index}
                        message={message.message}
                      />
                    );
                  })}
              </Grid>
            </Grid>
            <Grid
              container
              sx={
                {
                  // height: "15%",
                }
              }
              id="input section"
              p={2}
              alignItems={"end"}
              px={2}
              size={12}
              // bgcolor={theme.palette.background.paper}
            >
              <Grid flexGrow={1}>
                <TextField
                  size="small"
                  fullWidth
                  color="primary"
                  placeholder="Message Customer..."
                  variant="outlined"
                  sx={{
                    // border: 0.5,
                    borderRadius: "1.5 rem",
                  }}
                  onChange={(e) => {
                    setMessageValue(e.target.value);
                  }}
                />
              </Grid>
              <Grid container spacing={1}>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    cursor: "pointer",
                  }}
                  onClick={handleSendMessage}
                >
                  <SendIcon size={"medium"} />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LiveChat;
