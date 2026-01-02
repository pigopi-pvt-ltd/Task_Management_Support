import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  useTheme,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Header/Topbar";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import CustomSnackbar from "../Snackbar/Snackbar";
import * as socketFunctions from "../../utils/sockets/socketManagement.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addOnlineUser,
  removeOnlineUser,
  resetLiveChatRoom,
  setFileData,
  setFileHistory,
  setInitialOnlineUsers,
  setRoomMessage,
  setScreenShareData,
  setScreenShareRequest,
  setvoiceShareData,
  setVoiceShareRequest,
} from "../../store/slices/chatSupportSlice.js";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader.jsx";
import { getCurrentUserData } from "../../utils/auth.js";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const { chatRoom } = useSelector(
    (state) => state.chatSupport.liveChatRoomInfo
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUsername(res.data.username);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleClickBranch = async (branchId) => {
    try {
      const res = await axios.get(`/api/branch/${branchId}`);
      setSelectedBranch(res.data.name);
    } catch (err) {
      console.error(err);
    }
  };

  const socket = socketFunctions.getSocket();
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const currentUserData = getCurrentUserData();

  useEffect(() => {
    socket.on("room_and_ticket_created", (ticketData) => {
      console.log("ticket data---", ticketData);
      // dispatch(
      //   openSnackbar({
      //     message: "New Chat Ticket created By a User",
      //     severity: "info",
      //   })
      // );
      queryClient.invalidateQueries({
        queryKey: ["chat-tickets"],
      });
      alert("New Chat Ticket created By a User");
    });
    socket.on("receive_new_message", (messageData) => {
      console.log("new messaged received---", messageData);
      dispatch(
        setRoomMessage({
          message: messageData,
        })
      );
    });
    socket.on("initial_online_users_list", ({ users }) => {
      console.log("users from init---", users);
      dispatch(
        setInitialOnlineUsers({
          onlineUsers: users,
        })
      );
    });
    socket.on("user_online", (userData) => {
      console.log("userOnlineData", userData);
      dispatch(
        addOnlineUser({
          userId: userData.userId,
        })
      );
    });
    socket.on("user_offline", (userData) => {
      console.log("userOfflineData", userData);
      dispatch(
        removeOnlineUser({
          userId: userData.userId,
        })
      );
    });
    socket.on(
      "screen_share_request_" + currentUserData._id,
      (screenShareData) => {
        console.log("screen", screenShareData);
        console.log("currentUserData", currentUserData);
        if (screenShareData.agentId == currentUserData._id) {
          dispatch(
            setScreenShareData({
              screenShareData: screenShareData,
            })
          );
          dispatch(
            setScreenShareRequest({
              screenShareRequested: true,
            })
          );
          alert(
            "screen share request from " +
              screenShareData.username +
              " join room and accept."
          );
        }
      }
    );

    socket.on(
      "voice_share_request_" + currentUserData._id,
      (voiceShareData) => {
        console.log("screen", voiceShareData);
        console.log("currentUserData", currentUserData);
        if (voiceShareData.agentId == currentUserData._id) {
          dispatch(
            setvoiceShareData({
              voiceShareData: voiceShareData,
            })
          );
          dispatch(
            setVoiceShareRequest({
              voiceShareRequested: true,
            })
          );
          alert(
            "screen share request from " +
              voiceShareData.username +
              " join room and accept."
          );
        }
      }
    );

    socket.on(
      "chat-ticket-closed-user_" + currentUserData._id,
      (chatclosedData) => {
        console.log("chatcloseData---", chatclosedData);
        if (chatclosedData.roomId == chatRoom) {
          dispatch(resetLiveChatRoom());
          if (window.location.pathname == "/live-chat") {
            navigate("/my-chats");
          }
        }
        // alert("")
        // dispatch(
        //   openSnackbar({
        //     message: "Your chat session is closed by user.",
        //     severity: "warning",
        //   })
        // );
      }
    );

    socket.on("receive_file_link", (fileData) => {
      console.log("fileData---", fileData);
      dispatch(
        setFileData({
          fileData: fileData,
        })
      );
    });

    // Listener for history (when joining late)
    socket.on("file_history", (historyData) => {
      // historyData is an array of documents from MongoDB
      console.log("history--data--", historyData);
      dispatch(
        setFileHistory({
          fileHistory: historyData,
        })
      );
    });
    return () => {
      socket.off("room_and_ticket_created");
      socket.off("receive_new_message");
      socket.off("user_online");
      socket.off("user_offline");
      socket.off("screen_share_request" + currentUserData._id);
      socket.off("voice_share_request_" + currentUserData._id);
      socket.off("chat-ticket-closed-user_" + currentUserData._id);
      socket.off("receive_file_link");
      socket.off("file_history");
    };
  }, []);

  useEffect(() => {
    socket.emit("get_initial_online_users");
  }, []);

  return (
  <>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Topbar */}
      <Topbar
        handleDrawerToggle={handleDrawerToggle}
        username={username}
        branchName={selectedBranch}
      />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Desktop Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              top: "64px",
              height: "calc(100% - 64px)",
              display: isFullscreen ? "none" : "block",
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>

        {/* Mobile Sidebar */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          TransitionComponent={Slide}
          transitionDuration={{ enter: 500, exit: 500 }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              display: isFullscreen ? "none" : "block",
            },
          }}
        >
          <Box sx={{ textAlign: "right", p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Sidebar />
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            overflowY: "auto",
            bgcolor: "#eeeeee",
            ml: !isFullscreen ? { md: `${drawerWidth}px` } : 0,
            transition: "all 0.3s ease",
            height: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
          <CustomSnackbar />
        </Box>
      </Box>
    </Box>

    <Loader />
  </>
);

};

export default DashboardLayout;
