import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createSocialLink } from "../api/socialLink.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useCreateSocialLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSocialLink,

    onSuccess: async () => {
      toast.success("Social link created successfully");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.socialLinks,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create social link",
      );
    },
  });
}
