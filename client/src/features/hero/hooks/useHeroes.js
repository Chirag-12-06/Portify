import { useQuery } from "@tanstack/react-query";
import { getHeroes } from "../api/hero.api";

export function useHeroes() {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: getHeroes,
  });
}
