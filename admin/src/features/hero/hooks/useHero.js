import { useQuery } from "@tanstack/react-query";

import { getHeroes } from "../api/hero.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useHeroes() {
  return useQuery({
    queryKey: queryKeys.heroes,
    queryFn: getHeroes,
  });
}
