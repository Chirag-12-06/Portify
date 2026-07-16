import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateReadStatus } from "../api/contact.api";

export function useUpdateReadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReadStatus,

    onSuccess: () => {
      toast.success("Read status updated.");

      queryClient.invalidateQueries({
        queryKey: ["contactMessages"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });
}
