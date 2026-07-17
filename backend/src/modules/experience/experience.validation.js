import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),

  role: z.string().trim().min(1, "Role is required"),

  location: z
  .string()
  .trim()
  .transform((v) => v || undefined)
  .optional(),

  startDate: z.coerce.date(),

  endDate: z.coerce.date().optional(),

  currentlyWorking: z.boolean().optional(),

  companyImageUrl: z
    .string()
    .trim()
    .url("Invalid company image URL")
    .or(z.literal(""))
    .optional(),

  points: z
    .array(
      z.object({
        content: z.string().trim().min(1, "Point content is required"),

        displayOrder: z.number().int().nonnegative(),
      }),
    )
    .default([]),

  skillIds: z.array(z.string()).default([]),

  displayOrder: z.number().int().min(1).default(1),

  isVisible: z.boolean().default(true),
});

export const updateExperienceSchema = createExperienceSchema
  .partial()
  .superRefine((data, ctx) => {
    if (!data.currentlyWorking && !data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date is required",
      });
    }

    if (data.currentlyWorking && data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Current job should not have an end date",
      });
    }
  });
