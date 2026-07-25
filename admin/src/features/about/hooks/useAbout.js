import { useQuery } from "@tanstack/react-query";

import { getAbout } from "../api/about.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useAbout() {
  return useQuery({
    queryKey: queryKeys.about,
    queryFn: getAbout,
  });
}
