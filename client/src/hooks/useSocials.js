import { useQuery } from "@tanstack/react-query";
import { getSocials,getLeetCodeStats } from "../api/socials.api";

export function useSocials() {
  return useQuery({
    queryKey: ["socials"],
    queryFn: getSocials,
  });
}

export function useLeetCode() {
  return useQuery({
    queryKey: ["leetcode"],
    queryFn: getLeetCodeStats,
  });
}