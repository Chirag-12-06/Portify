import { z } from "zod";

import { STATUS } from "../constants/status";

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    ),

  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  shortDescription: z
    .string()
    .trim()
    .min(1, "Short description is required"),

  fullDescription: z
    .string()
    .trim()
    .min(1, "Full description is required"),

  thumbnailUrl: z
    .string()
    .trim()
    .url("Invalid thumbnail URL"),

  githubUrl: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .pipe(z.string().url("Invalid GitHub URL").optional()),

  liveUrl: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .pipe(z.string().url("Invalid Live URL").optional()),

  featured: z.boolean(),

  isVisible: z.boolean(),

  displayOrder: z.coerce
    .number()
    .int()
    .min(1, "Display order must be at least 1"),

  projectYear: z.coerce
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),

  status: z.enum(STATUS),

  gallery: z.array(
    z.object({
      imageUrl: z
        .string()
        .trim()
        .url("Invalid image URL"),

      displayOrder: z.coerce
        .number()
        .int()
        .min(1),

      caption: z
        .string()
        .trim()
        .optional(),
    })
  ),

  techIds: z.array(z.string()),

  skillIds: z.array(z.string()),
});

export const defaultValues = {
  slug: "",
  title: "",
  shortDescription: "",
  fullDescription: "",

  thumbnailUrl: "",

  githubUrl: "",
  liveUrl: "",

  featured: false,
  isVisible: true,

  displayOrder: 1,

  projectYear: new Date().getFullYear(),

  status: "IN_PROGRESS",

  gallery: [],

  techIds: [],

  skillIds: [],
};