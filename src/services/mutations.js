import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAssignChat } from "./api";

export const useAssignChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleAssignChat,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["My-assigned-chat-Tickets"],
      });
    },
  });
};
