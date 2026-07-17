import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "../api/experience.api";

export function useExperience() {
  return useQuery({
    queryKey: ["experience"],
    queryFn: getExperiences,
  });
}