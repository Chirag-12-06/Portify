import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteContactMessage } from "../api/contact.api";

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContactMessage,

    onSuccess: () => {
      toast.success("Message deleted.");

      queryClient.invalidateQueries({
        queryKey: ["contactMessages"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });
}
