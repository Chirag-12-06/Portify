import { z } from "zod";

const optionalString = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().optional()
);

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().url("Invalid hero image URL").optional()
);

export const updateHeroSchema = z.object({
  heroTitle: z.string().trim().min(1, "Title is required"),

  tagline: optionalString,

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  availability: optionalString,

  heroImageUrl: optionalUrl,
});