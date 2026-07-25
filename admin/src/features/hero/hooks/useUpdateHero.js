import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateHero } from "../api/hero.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useUpdateHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHero,

    onSuccess: async () => {
      toast.success("Hero updated successfully");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.heroes,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update hero");
    },
  });
}
