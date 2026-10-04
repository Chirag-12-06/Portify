import { z } from "zod";

export const ragQuestionSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required"),

  answer: z
    .string()
    .trim()
    .min(1, "Answer is required"),

  category: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  isPublished: z.boolean(),
});

export const defaultValues = {
  question: "",
  answer: "",
  category: "",
  isPublished: false,
};