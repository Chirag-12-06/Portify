import { z } from "zod";

export const educationSchema = z.object({
    institution: z.string().trim().min(1, "Institution is required"),

    degree: z.string().trim().min(1, "Degree is required"),

    fieldOfStudy: z
      .string()
      .trim()
      .min(1, "Field of study is required"),

    location: z.string().trim().optional(),

    grade: z.string().trim().optional(),

    startDate: z.string().min(1, "Start date is required"),

    endDate: z.string().optional(),

    currentlyStudying: z.boolean(),

    institutionImageUrl: z
      .union([
        z.literal(""),
        z.string().url("Invalid institution image URL"),
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.currentlyStudying && data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date should be empty while currently studying.",
      });
    }

    if (
      data.endDate &&
      !data.currentlyStudying &&
      new Date(data.endDate) < new Date(data.startDate)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be before start date.",
      });
    }
  });

export const defaultValues = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  grade: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  institutionImageUrl: "",
};