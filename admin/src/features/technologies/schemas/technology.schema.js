import { z } from "zod";
import { TECHNOLOGY_CATEGORIES } from "../constants/technologyCategories";

export const technologySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Technology name is required"),

  category: z.enum(TECHNOLOGY_CATEGORIES),

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
};