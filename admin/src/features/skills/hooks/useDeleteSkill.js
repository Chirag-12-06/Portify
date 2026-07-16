import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteSkill } from "../api/skills.api";

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,

    onSuccess: () => {
      toast.success("Skill deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
}
