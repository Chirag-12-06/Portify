import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createQuestion } from "../api/rag.api";

export function useCreateRagQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ragQuestions"] });
    },
  });
}
