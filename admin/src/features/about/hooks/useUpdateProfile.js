import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateProfile } from "../api/profile.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: async () => {
      toast.success("Profile updated successfully");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile,
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    },
  });
}