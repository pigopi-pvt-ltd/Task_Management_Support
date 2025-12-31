import { config } from "../../config";
import axiosInstance from "../utils/axiosInstance";

let backendbaseUrl = config.apiBaseUrl;

export const handleGetAllTickets = async (token, page) => {
  let url = `/chat-tickets/get-all-chat-tickets?page=${page}`;
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  let response = await fetch(backendbaseUrl + url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(errorData.error || "error while getting tickets");
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const handleGetAllSupportEmployees = async (token) => {
  let url = "/supportUsers/list-employees";
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  let response = await fetch(backendbaseUrl + url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(
      errorData.error || "error while getting support employees"
    );
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const handleAssignChat = async (assignChatData) => {
  let token = localStorage.getItem("token");
  console.log("assdata", assignChatData);
  let url = "/chat-tickets/assign-chat";
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  let response = await fetch(backendbaseUrl + url, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignChatData),
  });
  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(
      errorData.error || "error while getting assined ticket"
    );
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const handlegetAssignedChat = async (token, page) => {
  let url = `/chat-tickets/get-top-assigned-chat-ticket?page=${page}`;
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  let response = await fetch(backendbaseUrl + url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(errorData.error || "error while getting ticket");
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const getChatHistory = async (token, roomId) => {
  if (!roomId) {
    let error = new Error("No roomId provided");
    throw error;
  }
  let endPoint = `/chat-tickets/get-chat-history-by-room-id-support?roomId=${roomId}`;
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  const response = await fetch(backendbaseUrl + endPoint, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(
      errorData.error || "error while getting chat ticket data"
    );
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const handlegetallAssignedChats = async (token, page) => {
  let url = `/chat-tickets/get-support-employee-assigned-chats?page=${page}`;
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  let response = await fetch(backendbaseUrl + url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(errorData.error || "error while getting ticket");
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const getChatDataByRoomIdSupport = async (token, roomId) => {
  if (!roomId) {
    let error = new Error("No roomId provided");
    throw error;
  }
  let endPoint = `/chat-tickets/getChatDataByRoomIdSupport?roomId=${roomId}`;
  if (!token) {
    let error = new Error("No tocken provided");
    throw error;
  }
  const response = await fetch(backendbaseUrl + endPoint, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorData = await response.json();
    let error = new Error(
      errorData.error || "error while getting chat ticket data"
    );
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};

export const handlecloseTicket = async (closeTicketData) => {
  let endpoint = "/chat-tickets/close-chat-support";
  const { data } = await axiosInstance.put(endpoint, closeTicketData);
  return data;
};
