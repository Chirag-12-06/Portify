import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createSkill } from "../api/skills.api";

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,

    onSuccess: () => {
      toast.success("Skill created successfully");

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
}
