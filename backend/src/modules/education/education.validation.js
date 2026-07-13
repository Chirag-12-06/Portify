import { z } from "zod";

export const createEducationSchema = z.object({
  institution: z.string().trim().min(1, "Institution is required"),

  degree: z.string().trim().min(1, "Degree is required"),

  fieldOfStudy: z.string().trim().min(1, "Field of study is required"),

  grade: z.string().trim().optional(),

  location: z.string().trim().optional(),

  startDate: z.coerce.date(),

  endDate: z.coerce.date().optional(),

  currentlyStudying: z.boolean().optional(),

  institutionImageUrl: z
    .string()
    .url("Invalid institution image URL")
    .optional(),
});

export const updateEducationSchema =
  createEducationSchema.partial();