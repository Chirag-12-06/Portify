import { z } from "zod";
import { SKILL_CATEGORIES } from "../constants/skillCategories";

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required"),

  category: z.enum(SKILL_CATEGORIES),

});

export const defaultValues = {
  name: "",
  category: "SOFTWARE_DEVELOPMENT",
};