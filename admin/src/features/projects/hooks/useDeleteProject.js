import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "../api/project.api";

import { toast } from "sonner";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      toast.success("Project deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to delete project");
    },
  });
}
