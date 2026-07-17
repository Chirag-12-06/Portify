import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "../api/project.api";

import { toast } from "sonner";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      toast.success("Project created successfully");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to create project");
    },
  });
}
