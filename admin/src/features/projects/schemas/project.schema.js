import { z } from "zod";

import {STATUS} from "../constants/status";

export const projectSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),

  title: z.string().trim().min(1, "Title is required"),

  shortDescription: z
    .string()
    .trim()
    .min(1, "Short description is required"),

  fullDescription: z
    .string()
    .trim()
    .min(1, "Full description is required"),

  githubUrl: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .pipe(z.url("Invalid GitHub URL").optional()),

  liveUrl: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .pipe(z.url("Invalid Live URL").optional()),

  featured: z.boolean(),

  isVisible: z.boolean(),

  displayOrder: z.coerce
  .number()
  .int()
  .min(1, "Display order must be at least 1"),

  status: z.enum(STATUS),

  images: z.array(
    z.object({
      imageUrl: z.url("Invalid image URL"),
      displayOrder: z.coerce.number().int().min(1),
    })
  ),

  skillIds: z.array(z.string()),
});

export const defaultValues = {
  slug: "",
  title: "",
  shortDescription: "",
  fullDescription: "",

  githubUrl: "",
  liveUrl: "",

  featured: false,
  isVisible: true,

  displayOrder: 1,

  status: "ONGOING",

  images: [],

  skillIds: [],
};