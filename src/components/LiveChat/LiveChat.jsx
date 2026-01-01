import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Paper,
  Box,
  Divider,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  CloudDownload as DownloadIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeMessages,
  setLiveChatRoomInfo,
  setScreenShareRequest,
  setVoiceShareRequest,
} from "../../store/slices/chatSupportSlice.js";
import {
  useGetChatDataByRoomIdSupport,
  useGetChatHistory,
} from "../../services/queries";
import * as socketFunctions from "../../utils/sockets/socketManagement.js";

// Components
import ChatMessageFromUser from "./ChatMessageFromUser.jsx";
import ChatMessageFromEmployee from "./ChatMessageFromEmployee.jsx";
import AgentScreenViewer from "./AgentScreenViewer.jsx";
import ScreenShareRequestModal from "./ScreeenShareRequestModal.jsx";
import ResolveTicket from "./ResolveTicket.jsx";

const LiveChat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const currentRoomId = localStorage.getItem("currentRoomId");
  const messagesEndRef = useRef(null);

  const [messageValue, setMessageValue] = useState("");
  const [getHistory, setGetHistoryNow] = useState(false);

  const {
    messages,
    userInfo,
    fileData: receivedFiles,
  } = useSelector((state) => state.chatSupport.liveChatRoomInfo);
  const {
    screenShareRequested,
    screenShareData,
    voiceShareRequested,
    voiceShareData,
  } = useSelector((state) => state.chatSupport);

  const { data, isLoading, isSuccess } = useGetChatDataByRoomIdSupport(
    token,
    currentRoomId
  );
  const { data: chatHistoryMessages, isLoading: isHistoryLoading } =
    useGetChatHistory(token, currentRoomId, getHistory);

  // --- Logic ---
  useEffect(() => {
    if (data?.chatTicket?.[0]) {
      const ticket = data.chatTicket[0];
      dispatch(
        setLiveChatRoomInfo({
          chatRoom: ticket.chatRoom,
          userInfo: {
            organizationId: ticket.organizationId,
            branchId: ticket.branchId,
            userId: ticket.createdBy,
            username: ticket.createdByName,
          },
        })
      );
      if (isSuccess) setGetHistoryNow(true);
    }
  }, [data, isSuccess, dispatch]);

  useEffect(() => {
    if (chatHistoryMessages) {
      dispatch(initializeMessages({ messages: chatHistoryMessages.messages }));
    }
  }, [chatHistoryMessages, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socket = socketFunctions.getSocket();

  const handleSendMessage = () => {
    if (!messageValue.trim() || !data?.chatTicket?.[0]) return;
    const ticket = data.chatTicket[0];
    const messageData = {
      organizationId: ticket.organizationId,
      branchId: ticket.branchId,
      from: ticket.assignedTo,
      to: ticket.createdBy,
      message: messageValue.trim(),
      chatRoom: ticket.chatRoom,
      userId: ticket.createdBy,
    };
    socket.emit("join_room", { roomId: ticket.chatRoom });
    socket.emit("new_message", messageData);
    setMessageValue("");
  };

  const formatTimestamp = (utcString) => {
    const date = new Date(utcString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {data?.chatTicket?.[0] && (
        <Grid container size={12} spacing={1} p={1} sx={{ height: "85vh" }}>
          {/* LEFT: MAIN CHAT WINDOW */}
          <Grid
            item
            size={{ xs: 12, md: 6 }}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Chat Header */}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #f0f0f0",
                  bgcolor: "#fff",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color="success"
                  >
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {data.chatTicket[0].createdByName.charAt(0)}
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="700">
                      {data.chatTicket[0].createdByName}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <FiberManualRecordIcon
                        sx={{ fontSize: 10, color: "success.main" }}
                      />{" "}
                      Online
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                    fontWeight="600"
                  >
                    TICKET: {data.chatTicket[0].ticketType.replace("_", " ")}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      bgcolor: "#e3f2fd",
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                  >
                    {data.chatTicket[0].status}
                  </Typography>
                </Box>
              </Box>

              {/* Messages Area */}
              <Box
                sx={{
                  flexGrow: 1,
                  p: 3,
                  overflowY: "auto",
                  bgcolor: "#fcfcfc",
                }}
              >
                {messages.map((message, index) =>
                  message.from === userInfo?.userId ? (
                    <ChatMessageFromUser
                      key={index}
                      message={message.message}
                      sentAt={formatTimestamp(message.createdAt)}
                    />
                  ) : (
                    <ChatMessageFromEmployee
                      key={index}
                      message={message.message}
                      sentAt={formatTimestamp(message.createdAt)}
                    />
                  )
                )}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input Area */}
              <Box
                sx={{ p: 2, bgcolor: "#fff", borderTop: "1px solid #f0f0f0" }}
              >
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  InputProps={{
                    startAdornment: (
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <AttachFileIcon />
                      </IconButton>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={handleSendMessage}
                        disabled={!messageValue.trim()}
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: "#fff",
                          "&:hover": { bgcolor: theme.palette.primary.dark },
                        }}
                      >
                        <SendIcon fontSize="small" />
                      </IconButton>
                    ),
                    sx: { borderRadius: 3, px: 1 },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT: SIDEBAR */}
          <Grid
            item
            size={{ xs: 12, md: 6 }}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {userInfo && <ResolveTicket chatTicketID={data.chatTicket[0].id} />}

            <Paper
              elevation={0}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 4,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0" }}>
                <Typography variant="h6" fontWeight="700">
                  Shared Files
                </Typography>
              </Box>

              <Box sx={{ p: 2, overflowY: "auto", flexGrow: 1 }}>
                {receivedFiles.length === 0 ? (
                  <Box
                    sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
                  >
                    <Typography variant="body2">
                      No files shared in this session.
                    </Typography>
                  </Box>
                ) : (
                  receivedFiles.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1.5,
                        mb: 1.5,
                        borderRadius: 2,
                        border: "1px solid #f0f0f0",
                        bgcolor: "#fff",
                        transition: "0.2s",
                        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#e3f2fd", mr: 2 }}>
                        <AttachFileIcon sx={{ color: "#1976d2" }} />
                      </Avatar>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight="600" noWrap>
                          {file.fileName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimestamp(file.createdAt)}
                        </Typography>
                      </Box>
                      <Tooltip title="Download">
                        <IconButton
                          href={file.fileUrl}
                          download
                          target="_blank"
                          size="small"
                        >
                          <DownloadIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Modals & Overlay Components */}
      <AgentScreenViewer roomId={currentRoomId} />

      {screenShareData && (
        <ScreenShareRequestModal
          open={screenShareRequested}
          share="screen"
          customerName={screenShareData.username}
          onAccept={() => {
            socket.emit("screen_share_answer", {
              accepted: true,
              screenShareData,
            });
            dispatch(setScreenShareRequest({ screenShareRequested: false }));
          }}
          onDecline={() => {
            socket.emit("screen_share_answer", {
              accepted: false,
              screenShareData,
            });
            dispatch(setScreenShareRequest({ screenShareRequested: false }));
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
