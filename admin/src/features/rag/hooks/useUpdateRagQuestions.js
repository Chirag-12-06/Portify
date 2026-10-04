import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateQuestion } from "../api/rag.api";

export function useUpdateRagQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ragQuestions"] });
    },
  });
}
