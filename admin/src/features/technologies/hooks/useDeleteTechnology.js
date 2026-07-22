import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteTechnology } from "../api/technologies.api";

export function useDeleteTechnology() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTechnology,

    onSuccess: () => {
      toast.success("Technology deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["technologies"],
      });
    },
  });
}
