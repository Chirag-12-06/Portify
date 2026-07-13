import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company is required"),

  role: z
    .string()
    .trim()
    .min(1, "Role is required"),

  location: z
    .string()
    .trim()
    .optional(),

  startDate: z.coerce.date(),

  endDate: z.coerce.date().optional(),

  currentlyWorking: z
    .boolean()
    .optional(),

  companyImageUrl: z
    .string()
    .url("Invalid company image URL")
    .optional(),

  points: z
    .array(
      z.object({
        content: z
          .string()
          .trim()
          .min(1, "Point content is required"),

        displayOrder: z
          .number()
          .int()
          .nonnegative(),
      })
    )
    .default([]),

  skillIds: z
    .array(z.string())
    .default([]),
});

export const updateExperienceSchema =
  createExperienceSchema.partial();