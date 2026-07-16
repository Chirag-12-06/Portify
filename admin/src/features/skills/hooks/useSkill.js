import { useQuery } from "@tanstack/react-query";

import { getSkills } from "../api/skills.api";

export function useSkills(params = {}) {
  return useQuery({
    queryKey: ["skills", params],
    queryFn: () => getSkills(params),
  });
}