import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().trim().min(1),

  issuerId: z.string().trim().min(1),

  credentialUrl: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(z.url().optional()),

  badgeImageUrl: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(z.url().optional()),

  featured: z.boolean(),

  isVisible: z.boolean(),

  displayOrder: z.coerce.number().int().min(1),

  issueDate: z.string().min(1),

  expiryDate: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional(),

  skillIds: z.array(z.string()),
});

export const defaultValues = {
  title: "",
  issuerId: "",
  credentialUrl: "",
  badgeImageUrl: "",

  featured: false,
  isVisible: true,

  displayOrder: 1,

  issueDate: "",
  expiryDate: "",

  skillIds: [],
};