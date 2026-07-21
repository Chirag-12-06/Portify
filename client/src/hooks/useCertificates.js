import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "../api/certificates.api";

export function useCertificates() {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });
}