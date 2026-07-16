import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEducation } from "../api/education.api";

export function useCreateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["education"],
      });
    },
  });
}
