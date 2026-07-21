import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateIssuer } from "../api/issuer.api";

export function useUpdateIssuer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssuer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issuers"],
      });

      toast.success("Issuer updated successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update issuer",
      );
    },
  });
}