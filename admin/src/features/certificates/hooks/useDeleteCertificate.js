import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteCertificate } from "../api/certificate.api";

export function useDeleteCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertificate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });

      toast.success("Certificate deleted successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete certificate",
      );
    },
  });
}
