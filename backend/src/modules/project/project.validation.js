import { z } from "zod";
import { ProjectStatus } from "@prisma/client";

const optionalUrl = (message) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url(message).optional()
  );

export const createProjectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
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
    .url("Invalid thumbnail URL"),

  githubUrl: optionalUrl("Invalid GitHub URL"),

  liveUrl: optionalUrl("Invalid Live URL"),

  featured: z.boolean().optional(),

  isVisible: z.boolean().optional(),

  status: z.nativeEnum(ProjectStatus),

  projectYear: z
    .number()
    .int()
    .min(2000, "Invalid project year")
    .max(
      new Date().getFullYear() + 1,
      "Invalid project year"
    ),

  displayOrder: z
    .number()
    .int()
    .min(1, "Display order must be at least 1"),

  gallery: z
    .array(
      z.object({
        imageUrl: z.string().url("Invalid image URL"),
        displayOrder: z.number().int().min(0),
        caption: z.string().trim().optional(),
      })
    )
    .default([]),

  skillIds: z.array(z.string()).default([]),

  techIds: z.array(z.string()).default([]),
});

export const updateProjectSchema = createProjectSchema.partial();