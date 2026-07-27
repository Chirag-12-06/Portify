import { useQuery } from "@tanstack/react-query";
import { getCertificates, getIssuers, getFeaturedCertificates, getCertificateCards } from "../api/certificates.api";

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

export function useFeaturedCertificates() {
  return useQuery({
    queryKey: ["featuredCertificates"],
    queryFn: getFeaturedCertificates,
  });
}

export function useCertificateCards() {
  return useQuery({
    queryKey: ["certificateCards"],
    queryFn: getCertificateCards,
  });
}
