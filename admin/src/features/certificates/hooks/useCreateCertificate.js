import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCertificate } from "../api/certificate.api";

export function useCreateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCertificate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });

      toast.success("Certificate created successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create certificate",
      );
    },
  });
}
