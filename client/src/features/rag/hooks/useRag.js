import { useMutation } from "@tanstack/react-query";
import { getAnswer } from "../api/rag.api";

export default function useRag() {
  return useMutation({
    mutationFn: getAnswer,
  });
}