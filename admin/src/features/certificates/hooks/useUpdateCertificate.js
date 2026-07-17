import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCertificate } from "../api/certificate.api";

export function useUpdateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCertificate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });

      toast.success("Certificate updated successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update certificate",
      );
    },
  });
}
