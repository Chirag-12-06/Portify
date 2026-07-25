import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "../api/experiences.api";

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
}
