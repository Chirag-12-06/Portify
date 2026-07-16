import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateSocialLink } from "../api/socialLink.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useUpdateSocialLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSocialLink,

    onSuccess: async () => {
      toast.success("Social link updated successfully");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.socialLinks,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update social link",
      );
    },
  });
}
