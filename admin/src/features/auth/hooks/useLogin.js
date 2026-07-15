import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../api/auth.api";
import { queryKeys } from "../../../lib/queryKeys";

import { Routes } from "../../../lib/routes";

import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginAdmin,

    onSuccess: async () => {
      toast.success("Welcome back!");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth,
      });

      navigate(Routes.DASHBOARD, {
        replace: true,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}
