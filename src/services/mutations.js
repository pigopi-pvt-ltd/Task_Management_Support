import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAssignChat, handlecloseTicket } from "./api";
import { useDispatch } from "react-redux";
import { setLoader } from "../store/slices/loaderSlice";
import { useNavigate } from "react-router";
import * as socketFunctions from "../utils/sockets/socketManagement.js";

export const useAssignChat = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: handleAssignChat,
    onSettled: async () => {
      dispatch(
        setLoader({
          loading: true,
        })
      );

      await queryClient.invalidateQueries({
        queryKey: ["chat-tickets"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["My-assigned-chat-Tickets"],
      });

      dispatch(
        setLoader({
          loading: false,
        })
      );
    },
  });
};

export const useCloseChatTicket = (chatTicketCloseData) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: handlecloseTicket,
    onSuccess: async () => {
      dispatch(
        setLoader({
          loading: true,
        })
      );
      await queryClient.invalidateQueries({
        queryKey: ["chat-tickets"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["My-assigned-chat-Tickets"],
      });

      dispatch(
        setLoader({
          loading: false,
        })
      );
      const socket = socketFunctions.getSocket();
      // specially send room id and user id in chat ticket data
      socket.emit("chat-ticket-closed-by-support", chatTicketCloseData);
      navigate("/my-chats");
    },
  });
};
