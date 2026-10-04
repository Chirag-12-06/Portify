import { useQuery } from "@tanstack/react-query";

import { getEducations } from "../api/education.api";

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: getEducations,
  });
}
