import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../api/about.api";

export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });
}
