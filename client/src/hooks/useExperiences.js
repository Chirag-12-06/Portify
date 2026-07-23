import { useQuery } from "@tanstack/react-query";
import { getExperience } from "../api/experience.api";

export function useExperience() {
  return useQuery({
    queryKey: ["experience"],
    queryFn: getExperience,
  });
}


