import { z } from "zod";

export const createRagQuestionSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required"),

  answer: z
    .string()
    .trim()
    .min(1, "Answer is required"),

  category: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string()
      .trim()
      .max(100, "Category cannot exceed 100 characters")
      .optional()
  ),

  isPublished: z.boolean().optional(),
});

export const updateRagQuestionSchema =
  createRagQuestionSchema.partial();