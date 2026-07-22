import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTechnology } from "../api/technologies.api";

export function useUpdateTechnology() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTechnology,

    onSuccess: () => {
      toast.success("Technology updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["technologies"],
      });
    },
  });
}
