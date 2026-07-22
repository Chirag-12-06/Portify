import { useQuery } from "@tanstack/react-query";
import { getTechnologies } from "../api/technologies.api";

export function useTechnologies() {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: getTechnologies,
  });
}