import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../api/skills.api";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
}