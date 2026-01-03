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
import { setLoader } from "../../store/slices/loaderSlice.js";
import { getCurrentUserData } from "../../utils/auth.js";

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
    chatRoom,
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

  const chatContainerRef = useRef(null);

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
      socket.emit("join_room", { roomId: ticket.chatRoom });
      if (isSuccess) setGetHistoryNow(true);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (chatHistoryMessages) {
      dispatch(initializeMessages({ messages: chatHistoryMessages.messages }));
    }
  }, [chatHistoryMessages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socket = socketFunctions.getSocket();

  const fileInputRef = useRef(null);
  const currentUserData = getCurrentUserData();
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      socket.emit("upload_file", {
        room: chatRoom,
        file: reader.result,
        fileName: file.name,
        fileType: file.type,
        senderId: currentUserData._id,
        recieverId: userInfo.userId,
      });
      // dispatch(openSnackbar({ message: "File sent!", severity: "success" }));
      alert("file sent");
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

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

  dispatch(
    setLoader({
      loading: isLoading || isHistoryLoading,
    })
  );

  return (
    <>
      {data?.chatTicket?.[0] && (
        <Box
          sx={{
            height: { xs: "90dvh", md: "85vh" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            // Important: Main container should only scroll manually,
            // not triggered by the chat's internal auto-scroll.
            overflowY: { xs: "auto", md: "hidden" },
            overflowX: "hidden",
            bgcolor: "#f4f7f9",
            p: 1,
            mt: { xs: 2, md: 0 },
            gap: 2,
          }}
        >
          {/* LEFT: MAIN CHAT WINDOW */}
          <Box
            sx={{
              height: { xs: "100dvh", md: "100%" }, // Take full screen on mobile
              flex: { xs: "none", md: 6 },
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
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
                bgcolor: "#fff",
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    minWidth: 0,
                  }}
                >
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
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight="700" noWrap>
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
              </Box>

              {/* Messages Area - SCROLL IS NOW HANDLED VIA REF */}
              <Box
                ref={chatContainerRef}
                sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 3 },
                  overflowY: "auto",
                  bgcolor: "#fcfcfc",
                  display: "flex",
                  flexDirection: "column",
                  WebkitOverflowScrolling: "touch",
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
                {/* We keep this div as a fallback or for manual markers */}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input Area */}
              <Box
                sx={{ p: 2, bgcolor: "#fff", borderTop: "1px solid #f0f0f0" }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        onClick={() => fileInputRef.current.click()}
                        size="small"
                        sx={{ mr: 1 }}
                      >
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
                          width: 40,
                          height: 40,
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
          </Box>

          {/* RIGHT: SIDEBAR (FULL SCREEN ON MOBILE) */}
          <Box
            sx={{
              height: { xs: "100dvh", md: "100%" },
              flex: { xs: "none", md: 6 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pb: { xs: 4, md: 0 },
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
              <Box
                sx={{
                  p: 2,
                  borderBottom: "1px solid #f0f0f0",
                  bgcolor: "#fff",
                }}
              >
                <Typography variant="h6" fontWeight="700">
                  Shared Files
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  overflowY: "auto",
                  flexGrow: 1,
                  bgcolor: "#fcfcfc",
                }}
              >
                {receivedFiles.length === 0 ? (
                  <Box
                    sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
                  >
                    <Typography variant="body2">No files shared.</Typography>
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
                      <IconButton
                        href={file.fileUrl}
                        download
                        target="_blank"
                        size="small"
                      >
                        <DownloadIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Box>
                  ))
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {/* Modals & Overlay Components */}

      <AgentScreenViewer roomId={chatRoom} />

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
            socket.emit("voice_share_answer", {
              accepted: true,
              voiceShareData: voiceShareData,
            });
            dispatch(setVoiceShareRequest({ voiceShareRequested: false }));
          }}
          onDecline={() => {
            socket.emit("voice_share_answer", {
              accepted: false,
              voiceShareData: voiceShareData,
            });
            dispatch(setVoiceShareRequest({ voiceShareRequested: false }));
          }}
        />
      )}
    </>
  );
};

export default LiveChat;
