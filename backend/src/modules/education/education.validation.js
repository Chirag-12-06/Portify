import { z } from "zod";

const emptyToUndefined = (value) => (value === "" ? undefined : value);

export const createEducationSchema = z.object({
  institution: z.string().trim().min(1, "Institution is required"),

  degree: z.string().trim().min(1, "Degree is required"),

  fieldOfStudy: z.string().trim().min(1, "Field of study is required"),

  location: z.preprocess(emptyToUndefined, z.string().optional()),

  grade: z.preprocess(emptyToUndefined, z.string().optional()),

  startDate: z.coerce.date(),

  endDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),

  currentlyStudying: z.boolean().optional(),

  institutionImageUrl: z.preprocess(
    emptyToUndefined,
    z.string().url("Invalid institution image URL").optional(),
  ),
});

function educationRefinement(data, ctx) {
  if (data.currentlyStudying && data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "End date must be empty when currently studying.",
    });
  }

  if (
    data.endDate &&
    !data.currentlyStudying &&
    data.endDate < data.startDate
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "End date cannot be before start date.",
    });
  }
}

export const updateEducationSchema = createEducationSchema
  .partial()
  .superRefine(educationRefinement);
