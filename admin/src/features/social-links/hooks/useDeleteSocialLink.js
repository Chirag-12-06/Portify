import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteSocialLink } from "../api/socialLink.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useDeleteSocialLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSocialLink,

    onSuccess: async () => {
      toast.success("Social link deleted successfully");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.socialLinks,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete social link",
      );
    },
  });
}
