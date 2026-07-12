import { z } from "zod";

export const createProjectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required"),

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

  githubUrl: z
    .url("Invalid GitHub URL")
    .optional(),

  liveUrl: z
    .url("Invalid Live URL")
    .optional(),

  featured: z
    .boolean()
    .optional(),

  status: z.enum([
    "COMPLETED",
    "IN_PROGRESS",
    "PLANNED",
  ]),
});

export const updateProjectSchema = createProjectSchema.partial();