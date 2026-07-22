import { z } from "zod";

export const createTechSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tech name is required"),

  category: z.enum([
    "LANGUAGE",
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "FRAMEWORK",
    "ML_AI",
    "TOOLS",
    "CLOUD",
    "DATA_ANALYSIS",
    "DATA_VISUALIZATION",
  ]),

  imageUrl: z.preprocess(
  (value) => value === "" ? undefined : value,
  z.string().url().optional()
),
});

export const updateTechSchema = createTechSchema.partial();