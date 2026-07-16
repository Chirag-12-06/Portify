import { useQuery } from "@tanstack/react-query";
import { getContactMessages } from "../api/contact.api";

export function useContactMessages() {
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: getContactMessages,
  });
}