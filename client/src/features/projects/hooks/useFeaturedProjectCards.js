import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjectCards } from "../api/projects.api";

export function useFeaturedProjectCards() {
  return useQuery({
    queryKey: ["featured-project-cards"],
    queryFn: getFeaturedProjectCards,
  });
}
