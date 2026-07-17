import { z } from "zod";
import { ProjectStatus } from "@prisma/client";

export const createProjectSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),

  title: z.string().trim().min(1, "Title is required"),

  shortDescription: z.string().trim().min(1, "Short description is required"),

  fullDescription: z.string().trim().min(1, "Full description is required"),

  githubUrl: z.url("Invalid GitHub URL").optional(),

  liveUrl: z.url("Invalid Live URL").optional(),

  featured: z.boolean().optional(),

  status: z.nativeEnum(ProjectStatus).default("PLANNED"),

  images: z
    .array(
      z.object({
        imageUrl: z.url("Invalid image URL"),
        displayOrder: z.number().int().nonnegative(),
      }),
    )
    .default([]),

  skillIds: z.array(z.string()).default([]),

  displayOrder: z
    .number()
    .int()
    .nonnegative()
    .min(1, "Display order must be at least 1"),
});

export const updateProjectSchema = createProjectSchema.partial();
