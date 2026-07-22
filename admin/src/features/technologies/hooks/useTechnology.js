import { useQuery } from "@tanstack/react-query";

import { getTechnologies } from "../api/technologies.api";

export function useTechnologies(params = {}) {
  return useQuery({
    queryKey: ["technologies", params],
    queryFn: () => getTechnologies(params),
  });
}