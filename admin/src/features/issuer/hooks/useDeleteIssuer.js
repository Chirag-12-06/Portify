import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteIssuer } from "../api/issuer.api";

export function useDeleteIssuer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIssuer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issuers"],
      });

      toast.success("Issuer deleted successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete issuer",
      );
    },
  });
}