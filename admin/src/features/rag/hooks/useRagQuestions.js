import { useQuery } from "@tanstack/react-query";

import { getQuestions } from "../api/rag.api";

export function useRagQuestions() {
  return useQuery({
    queryKey: ["ragQuestions"],
    queryFn: getQuestions,
  });
}
