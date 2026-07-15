import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../api/profile.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
  });
}