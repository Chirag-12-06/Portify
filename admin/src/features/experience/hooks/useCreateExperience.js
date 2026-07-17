import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExperience } from "../api/experience.api";
import {toast} from "sonner";

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperience,

    onSuccess: () => {
      toast.success("Experience created");
      queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed");
    },
  });
}
