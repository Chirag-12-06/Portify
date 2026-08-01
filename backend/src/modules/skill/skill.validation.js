import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required"),

  category: z.enum([
    "SOFTWARE_DEVELOPMENT",
    "FRONTEND",
    "BACKEND",
    "DATABASES",
    "DEVOPS",
    "CLOUD",
    "DATA_ANALYTICS",
    "DATA_SCIENCE",
    "MACHINE_LEARNING",
    "ARTIFICIAL_INTELLIGENCE",
    "COMPUTER_VISION",
    "NLP_LLM",
    "MLOPS",
    "UI_UX",
    "TESTING",
    "VERSION_CONTROL",
    "SOFT_SKILLS",
  ]),
});

export const updateSkillSchema = createSkillSchema.partial();
