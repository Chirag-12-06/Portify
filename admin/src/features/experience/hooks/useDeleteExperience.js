import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExperience } from "../api/experience.api";
import {toast} from "sonner";

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,

    onSuccess: () => {
      toast.success("Experience deleted");
      queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed");
    },
  });
}
