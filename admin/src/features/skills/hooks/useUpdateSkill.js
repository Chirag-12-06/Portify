import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateSkill } from "../api/skills.api";

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,

    onSuccess: () => {
      toast.success("Skill updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
}
