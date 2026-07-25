import { z } from "zod";

export const updateAboutSchema = z.object({
  heading: z.string().trim().min(1, "Heading is required"),

  content: z.string().trim().min(1, "Content is required"),

  highlights: z.array(
    z.object({
      id: z.string().optional(),

      stat: z.string().trim().min(1, "Stat is required"),

      label: z.string().trim().min(1, "Label is required"),

      order: z.number().int().nonnegative().default(0),
    })
  ).default([]),
});