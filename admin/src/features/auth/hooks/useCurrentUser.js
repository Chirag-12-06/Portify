import { useQuery } from "@tanstack/react-query";
import { getCurrentAdmin } from "../api/auth.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth,
    queryFn: getCurrentAdmin,
    retry: false,
  });
}