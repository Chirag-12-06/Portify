import { useQuery } from "@tanstack/react-query";

import { getIssuers } from "../api/issuer.api";

export function useIssuers() {
  return useQuery({
    queryKey: ["issuers"],
    queryFn: getIssuers,
  });
}