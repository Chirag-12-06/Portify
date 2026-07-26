import { useQuery } from "@tanstack/react-query";
import { getProjectCards } from "../api/projects.api";

export function useProjectCards() {
  return useQuery({
    queryKey: ["project-cards"],
    queryFn: getProjectCards,
  });
}
