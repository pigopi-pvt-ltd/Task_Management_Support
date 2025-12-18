import io from "socket.io-client";

// The URL of your Node.js backend
const SOCKET_SERVER_URL = "http://localhost:3000";

// Initialize the socket connection
const socket = io(SOCKET_SERVER_URL, {
  autoConnect: true, // You can set this to false and connect manually later
});

// --- General Socket Functions ---

export const getSocket = () => socket;
