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
  useGetChatDataByRoomIdSupport,
  useGetChatHistory,
} from "../../services/queries";
import { useEffect, useRef, useState } from "react";

import * as socketFunctions from "../../utils/sockets/socketManagement.js";
// import ChatMessageTo from "./ChatMessageFromEmployee.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeMessages,
  setLiveChatRoomInfo,
  setRoomMessage,
  setScreenShareRequest,
  setVoiceShareRequest,
} from "../../store/slices/chatSupportSlice.js";
// import ChatMessageFrom from "./ChatMessageFromUser.jsx";
import ChatMessageFromUser from "./ChatMessageFromUser.jsx";
import ChatMessageFromEmployee from "./ChatMessageFromEmployee.jsx";
import Peer from "peerjs";
import AgentScreenViewer from "./AgentScreenViewer.jsx";
import ScreenShareRequestModal from "./ScreeenShareRequestModal.jsx";

const LiveChat = () => {
  // will get assigned ticket

  const theme = useTheme();
  let token = localStorage.getItem("token");
  let currentRoomId = localStorage.getItem("currentRoomId");
  const [page, setPage] = useState(1);

  const { messages, chatRoom, userInfo } = useSelector(
    (state) => state.chatSupport.liveChatRoomInfo
  );
  const {
    screenShareRequested,
    screenShareData,
    voiceShareData,
    voiceShareRequested,
  } = useSelector((state) => state.chatSupport);
  const dispatch = useDispatch();
  const [getHistory, setGetHistoryNow] = useState(false);
  const { data, isError, error, isLoading, isSuccess } =
    useGetChatDataByRoomIdSupport(token, currentRoomId);
  if (data) {
    console.log("data--ct-----", data);
  }
  if (isError) {
    console.log("err", error);
  }
  const {
    data: chatHistoryMessages,
    isError: isHistoryError,
    error: HistoryError,
    isLoading: isHistoryLoading,
  } = useGetChatHistory(token, currentRoomId, getHistory);
  if (isHistoryError) {
    console.log("history error---", HistoryError);
  }
  useEffect(() => {
    if (data && data.chatTicket[0]) {
      console.log("data from assigned ticket---", data);
      if (data.chatTicket[0])
        dispatch(
          setLiveChatRoomInfo({
            chatRoom: data.chatTicket[0].chatRoom,
            userInfo: {
              organizationId: data.chatTicket[0].organizationId,
              branchId: data.chatTicket[0].branchId,
              userId: data.chatTicket[0].createdBy,
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

  //scrolling code

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socket = socketFunctions.getSocket();
  const handleSendMessage = () => {
    if (messageValue.trim().length == 0) {
      return;
    }
    let messageData = {
      organizationId: data.chatTicket[0].organizationId,
      branchId: data.chatTicket[0].branchId,
      from: data.chatTicket[0].assignedTo,
      to: data.chatTicket[0].createdBy,
      message: messageValue.trim(),
      chatRoom: data.chatTicket[0].chatRoom,
      userId: data.chatTicket[0].createdBy,
    };
    socket.emit("join_room", {
      roomId: data.chatTicket[0].chatRoom,
    });

    socket.emit("new_message", messageData);
    setMessageValue("");
    // dispatch(
    //   setRoomMessage({
    //     message: messageData,
    //   })
    // );
  };

  const [messageValue, setMessageValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      console.log("Enter pressed! Sending message...");
      handleSendMessage();
    }
  };

  function formatTimestamp(utcString) {
    const date = new Date(utcString);

    // 1. Get the day and determine the ordinal suffix (st, nd, rd, th)
    const day = date.getDate();
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    // 2. Format the month, year, and time components
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // 3. Format the time (3:45 pm)
    const time = date
      .toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();

    return `${getOrdinal(day)} ${month}, ${time}`;
  }

  return (
    <>
      {/* {isHistoryLoading} */}
      {data && data.chatTicket[0] && (
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
                  User: {data.chatTicket[0].createdByName}
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
                    {data.chatTicket[0].ticketType.replaceAll("_", " ")}
                  </span>
                </Typography>
                <Typography variant="subtitle1">
                  Status:{" "}
                  <span
                    style={{
                      fontWeight: "medium",
                    }}
                  >
                    {data.chatTicket[0].status}
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
                      message.from == data.chatTicket[0].assignedTo ? (
                      <ChatMessageFromEmployee
                        key={index}
                        message={message.message}
                        sentAt={formatTimestamp(message.createdAt)}
                      />
                    ) : (
                      <ChatMessageFromUser
                        key={index}
                        message={message.message}
                        sentAt={formatTimestamp(message.createdAt)}
                      />
                    );
                  })}
                <div ref={messagesEndRef} />
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
                  value={messageValue}
                  onChange={(e) => {
                    setMessageValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
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
      (
      <AgentScreenViewer
        // stream={stream}
        // remoteVideoRef={remoteVideoRef}
        roomId={currentRoomId}
      />
      )
      {screenShareData && (
        <ScreenShareRequestModal
          open={screenShareRequested}
          share={"screen"}
          customerName={screenShareData.username}
          onAccept={() => {
            console.log("Accepted!");
            socket.emit("screen_share_answer", {
              accepted: true,
              screenShareData: screenShareData,
            });
            dispatch(
              setScreenShareRequest({
                screenShareRequested: false,
              })
            );
          }}
          onDecline={() => {
            console.log("Declined!");
            socket.emit("screen_share_answer", {
              accepted: false,
              screenShareData: screenShareData,
            });
            dispatch(
              setScreenShareRequest({
                screenShareRequested: false,
              })
            );
          }}
        />
      )}
      {voiceShareData && (
        <ScreenShareRequestModal
          open={voiceShareRequested}
          customerName={voiceShareData.username}
          share={"audio"}
          onAccept={() => {
            console.log("Accepted!");
            socket.emit("voice_share_answer", {
              accepted: true,
              voiceShareData: voiceShareData,
            });
            dispatch(
              setVoiceShareRequest({
                voiceShareRequested: false,
              })
            );
          }}
          onDecline={() => {
            console.log("Declined!");
            socket.emit("voice_share_answer", {
              accepted: false,
              voiceShareData: voiceShareData,
            });
            dispatch(
              setVoiceShareRequest({
                voiceShareRequested: false,
              })
            );
          }}
        />
      )}
    </>
  );
};

export default LiveChat;
