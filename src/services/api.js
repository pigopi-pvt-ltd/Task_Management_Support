import { config } from "../../config";

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
      errorData.error || "error while getting support employees"
    );
    error.errorData = errorData;
    throw error;
  }
  return await response.json();
};
