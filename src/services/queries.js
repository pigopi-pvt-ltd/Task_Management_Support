import { useQuery } from "@tanstack/react-query";
import { handleGetAllSupportEmployees, handleGetAllTickets } from "./api";

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
      return handleGetAllTickets(token);
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
