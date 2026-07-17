import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExperience } from "../api/experience.api";
import {toast} from "sonner";

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExperience,

    onSuccess: () => {
      toast.success("Experience updated");
      queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed");
    },
  });
}
