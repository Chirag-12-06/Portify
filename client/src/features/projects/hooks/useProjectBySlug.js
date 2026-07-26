import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "../api/projects.api";

export function useProjectBySlug(slug) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
  });
}
