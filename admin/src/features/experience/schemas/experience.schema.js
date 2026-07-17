import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),

  role: z.string().min(1, "Role is required"),

  location: z.string().optional(),

  startDate: z.string().min(1, "Start date is required"),

  endDate: z.string().optional(),

  currentlyWorking: z.boolean(),

  companyImageUrl: z
    .string()
    .url("Invalid company image URL")
    .or(z.literal("")),

  skillIds: z.array(z.string()),

  points: z.array(
    z.object({
      content: z.string().min(1, "Point content is required"),
      displayOrder: z.number().int().nonnegative(),
    })
  ),
});

export const defaultValues = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  companyImageUrl: "",
  skillIds: [],
  points: [],
};