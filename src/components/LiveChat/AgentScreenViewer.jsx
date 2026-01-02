import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MonitorIcon from "@mui/icons-material/Monitor";
import Peer from "peerjs";
import { config } from "../../../config";
import * as socketFunctions from "../../utils/sockets/socketManagement.js";
// const host = import.meta.env.HOST_DEV;
// const port =  import.meta.env.PORT

const AgentScreenViewer = ({ roomId }) => {
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);
  // const [stream, setStream] = useState(null);
  const remoteVideoRef = useRef(null);
  // const peerRef = useRef(null);
  // const peerInstance = useRef(null);

  const [stream, setStream] = useState(null);

  const peerInstance = useRef(null); // Keep track of the peer instance

  // const [isControlActive, setIsControlActive] = useState(false);
  const socket = socketFunctions.getSocket(); // Get existing socket instance

  const [controlStatus, setControlStatus] = useState("idle");

  const handleRequestControl = () => {
    setControlStatus("requesting");
    socket.emit("request_control", { roomId });
  };

  const handleVideoClick = (e) => {
    // Only send events if the user accepted control
    if (controlStatus !== "active" || !remoteVideoRef.current) return;

    // 1. Get the bounding box of the video element
    const rect = remoteVideoRef.current.getBoundingClientRect();

    // 2. Calculate the click position as a percentage (0 to 1)
    // This ensures accuracy even if the agent's screen is a different size than the user's
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // 3. Emit the event data to the server (which relays it to the user)
    socket.emit("remote_input_send", {
      roomId,
      eventData: {
        type: "click",
        x: x,
        y: y,
      },
    });
  };

  const handleMouseMove = (e) => {
    if (controlStatus !== "active" || !remoteVideoRef.current) return;

    const rect = remoteVideoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    socket.emit("remote_input_send", {
      roomId,
      eventData: {
        type: "mousemove",
        x: x,
        y: y,
      },
    });
  };

  useEffect(() => {
    if (!roomId || peerInstance.current) return;

    const isLocalhost = window.location.hostname === "localhost";
    const peer = new Peer(roomId, {
      host: isLocalhost ? "localhost" : config.host,
      port: isLocalhost ? 3000 : 443,
      path: "/peerjs",
      secure: !isLocalhost,
      // config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
    });

    peerInstance.current = peer;

    peer.on("open", (id) => {
      console.log("Agent Peer live:", id);
    });

    peer.on("call", (call) => {
      console.log("Incoming call triggered!");
      call.answer();

      let hasVideo = false;
      call.on("stream", (incomingStream) => {
        // FORCE RE-ATTACHMENT
        // Sometimes browsers need the srcObject to be set to null first
        hasVideo = incomingStream.getVideoTracks().length > 0;
        if (hasVideo) {
          console.log("Stream Active:", incomingStream.active);
          console.log(
            "Video Track State:",
            incomingStream.getVideoTracks()[0].readyState
          );

          // // Force the video to refresh
          // if (remoteVideoRef.current) {
          //   remoteVideoRef.current.srcObject = null;
          //   remoteVideoRef.current.srcObject = incomingStream;
          // }
          // setStream(incomingStream);
          // setOpen(true); // This will now trigger correctly
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
            remoteVideoRef.current.srcObject = incomingStream;

            // Ensure play is called
            remoteVideoRef.current
              .play()
              .catch((e) => console.error("Play error:", e));
          }
          setStream(incomingStream);
          setOpen(true);
        } else {
          if (audioRef.current) {
            audioRef.current.srcObject = incomingStream;
            audioRef.current.play().catch(console.error);
          }
        }
      });
      call.on("close", () => {
        console.log(`Call closed. Was it video? ${hasVideo}`);

        if (hasVideo) {
          // ONLY close the modal if the VIDEO call ended
          setStream(null);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
          setOpen(false);
        } else {
          // If it was just audio, just clean up the audio reference
          if (audioRef.current) {
            audioRef.current.srcObject = null;
          }
          console.log("Audio ended, but keeping screen share open.");
        }
      });
    });

    return () => {
      // Only destroy if it's NOT a re-render or if the connection is established
      // This helps avoid the "WebSocket closed before connection" warning
      if (peerInstance.current && peerInstance.current.open) {
        peerInstance.current.destroy();
        peerInstance.current = null;
      }
    };
  }, [roomId]);

  const stopControl = () => {
    setControlStatus("idle");
    // Tell the server to tell the user we are done
    socket.emit("stop_control", { roomId });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("control_response_from_user", ({ accepted }) => {
      console.log("accepted---", accepted);
      if (accepted) {
        setControlStatus("active");
      } else {
        setControlStatus("idle");
        alert("User denied the control request.");
      }
    });

    // Cleanup listeners
    return () => {
      socket.off("control_response_from_user");
    };
  }, [socket]);

  const handleClose = () => {
    setOpen(false);
    // Optionally stop the stream playback
  };

  return (
    <>
      <audio ref={audioRef} autoPlay />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <MonitorIcon color="primary" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Screen Share
          </Typography>

          <Box sx={{ mr: 2 }}>
            {controlStatus === "idle" && (
              <button
                onClick={handleRequestControl}
                style={{
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Take Control
              </button>
            )}
            {controlStatus === "requesting" && (
              <button
                disabled
                style={{
                  background: "#ffa000",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                }}
              >
                Waiting for Consent...
              </button>
            )}
            {controlStatus === "active" && (
              <button
                onClick={stopControl}
                style={{
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Stop Control
              </button>
            )}
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            backgroundColor: "#000",
            p: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", height: "auto", maxHeight: "70vh" }}>
            <video
              // ref={remoteVideoRef}
              ref={(node) => {
                if (node && stream) {
                  node.srcObject = stream; // Direct assignment avoids React render timing issues
                }
                remoteVideoRef.current = node;
              }}
              autoPlay
              onClick={handleVideoClick}
              onMouseMove={handleMouseMove}
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              muted
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgentScreenViewer;
