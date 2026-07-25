import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateAbout } from "../api/about.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useUpdateAbout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAbout,

    onSuccess: async () => {
      toast.success("About updated successfully");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.about,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update about");
    },
  });
}
