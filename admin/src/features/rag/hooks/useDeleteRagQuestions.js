import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteQuestion } from "../api/rag.api";

export function useDeleteRagQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ragQuestions"] });
    },
  });
}
