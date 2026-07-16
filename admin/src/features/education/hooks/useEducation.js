import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../api/education.api";

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: getEducations,
  });
}



