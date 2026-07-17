import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "../api/project.api";

import { toast } from "sonner";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: () => {
      toast.success("Project updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to update project");
    },
  });
}
