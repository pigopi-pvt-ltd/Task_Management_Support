import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAssignChat } from "./api";
import { useDispatch } from "react-redux";
import { setLoader } from "../store/slices/loaderSlice";

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
