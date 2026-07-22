import { z } from "zod";

export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required"),

  category: z.enum([
    "SOFTWARE_DEVELOPMENT",
    "DATA_SCIENCE",
    "MACHINE_LEARNING",
    "ARTIFICIAL_INTELLIGENCE",
    "DATABASES",
    "DEVOPS",
    "CLOUD",
    "VERSION_CONTROL",
    "TESTING",
    "UI_UX",
    "SOFT_SKILLS"
  ]),
});

export const updateSkillSchema = createSkillSchema.partial();