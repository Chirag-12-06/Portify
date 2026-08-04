import { z } from "zod";
import { TECHNOLOGY_CATEGORIES } from "../constants/TechnologyCategories";
import { TECHNOLOGY_COLORS } from "../constants/TechnologyColor";

export const technologySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Technology name is required"),

  category: z.enum(TECHNOLOGY_CATEGORIES),

  color: z.enum(TECHNOLOGY_COLORS),

  imageUrl: z
    .string()
    .trim()
    .url("Invalid image URL")
    .or(z.literal(""))
    .optional(),
});

export const defaultValues = {
  name: "",
  category: "FRONTEND",
  imageUrl: "",
  color: "Cyan",
};