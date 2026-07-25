import { z } from "zod";

export const heroSchema = z.object({
  heroTitle: z.string().trim().min(1, "Title is required"),

  tagline: z.string().trim().optional(),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  availability: z.string().trim().optional(),

  heroImageUrl: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Invalid hero image URL").optional(),
  ),
});

export const defaultValues = {
  title: "",
  tagline: "",
  description: "",
  availability: "",
  heroImageUrl: "",
};
