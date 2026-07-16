import { z } from "zod";

export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required"),

  category: z.enum([
    "LANGUAGE",
    "CS_FUNDAMENTALS",
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "FRAMEWORK",
    "ML_AI",
    "TOOLS",
    "CLOUD",
  ]),

  imageUrl: z.preprocess(
  (value) => value === "" ? undefined : value,
  z.string().url().optional()
),
});

export const updateSkillSchema = createSkillSchema.partial();