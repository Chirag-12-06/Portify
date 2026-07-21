import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createIssuer } from "../api/issuer.api";

export function useCreateIssuer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssuer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issuers"],
      });

      toast.success("Issuer created successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create issuer",
      );
    },
  });
}