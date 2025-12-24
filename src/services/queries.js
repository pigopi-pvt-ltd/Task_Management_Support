import { useQuery } from "@tanstack/react-query";
import {
  getChatDataByRoomIdSupport,
  getChatHistory,
  handleAssignChat,
  handlegetallAssignedChats,
  handleGetAllSupportEmployees,
  handleGetAllTickets,
  handlegetAssignedChat,
} from "./api";

export const useGetAllTickets = (token, page) => {
  return useQuery({
    queryKey: [
      "chat-tickets",
      {
        page: page,
        token: token,
      },
    ],
    queryFn: () => {
      return handleGetAllTickets(token, page);
    },
  });
};

export const useGetAllSupportEmployees = (token) => {
  return useQuery({
    queryKey: [
      "support-employee",
      {
        token: token,
      },
    ],
    queryFn: () => {
      return handleGetAllSupportEmployees(token);
    },
  });
};

export const useGetAssignedTicket = (token, page) => {
  return useQuery({
    queryKey: [
      "assigned-ticket",
      {
        token: token,
        page: page,
      },
    ],
    queryFn: () => {
      return handlegetAssignedChat(token, page);
    },
  });
};

export const useGetChatHistory = (token, roomId, getHistory) => {
  return useQuery({
    queryKey: [
      "chat-history",
      {
        token: token,
        roomId: roomId,
        getHistory: getHistory,
      },
    ],
    queryFn: () => getChatHistory(token, roomId),
    enabled: !!roomId,
  });
};

export const useGetallAssignedChatTickets = (token, page) => {
  return useQuery({
    queryKey: [
      "My-assigned-chat-Tickets",
      {
        token: token,
        page: page,
      },
    ],
    queryFn: () => {
      return handlegetallAssignedChats(token, page);
    },
  });
};

export const useGetChatDataByRoomIdSupport = (token, roomId) => {
  return useQuery({
    queryKey: [
      "chat-history",
      {
        token: token,
        roomId: roomId,
        // getHistory: getHistory,
      },
    ],
    queryFn: () => getChatDataByRoomIdSupport(token, roomId),
  });
};
