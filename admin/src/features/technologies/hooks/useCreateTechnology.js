import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createTechnology } from "../api/technologies.api";

export function useCreateTechnology() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTechnology,

    onSuccess: () => {
      toast.success("Technology created successfully");

      queryClient.invalidateQueries({
        queryKey: ["technologies"],
      });
    },
  });
}
