import { useQuery } from "@tanstack/react-query";
import { getCertificates, getIssuers } from "../api/certificates.api";

export function useCertificates() {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });
}

export function useIssuers() {
  return useQuery({
    queryKey: ["issuers"],
    queryFn: getIssuers,
  });
}
