import { useQuery } from "@tanstack/react-query";

import { getSocialLinks } from "../api/socialLink.api";
import { queryKeys } from "../../../lib/queryKeys";

export function useSocialLink() {
  return useQuery({
    queryKey: queryKeys.socialLinks,
    queryFn: getSocialLinks,
  });
}