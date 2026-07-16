import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEducation } from "../api/education.api";

export function useDeleteEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["education"],
      });
    },
  });
}
