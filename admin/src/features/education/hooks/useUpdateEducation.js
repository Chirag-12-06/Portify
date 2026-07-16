import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEducation } from "../api/education.api";

export function useUpdateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["education"],
      });
    },
  });
}
