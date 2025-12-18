import { useMutation } from "@tanstack/react-query";
import { handleAssignChat } from "./api";

export const useAssignChat = () => {
  return useMutation({
    mutationFn: handleAssignChat,
  });
};
