import { useQuery } from "@tanstack/react-query";
import { getEducations } from "../api/educations.api";

export function useEducations() {
  return useQuery({
    queryKey: ["educations"],
    queryFn: getEducations,
  });
}


