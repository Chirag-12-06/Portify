import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateRepliedStatus } from "../api/contact.api";

export function useUpdateRepliedStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRepliedStatus,

    onSuccess: () => {
      toast.success("Reply status updated.");

      queryClient.invalidateQueries({
        queryKey: ["contactMessages"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });
}
