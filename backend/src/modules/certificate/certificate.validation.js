import { z } from "zod";

export const createCertificateSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  issuerId: z.string().min(1, "Issuer is required"),

  credentialUrl: z
    .string()
    .url("Invalid credential URL"),

  badgeImageUrl: z
    .string()
    .url("Invalid badge image URL")
    .optional(),

  featured: z.boolean().optional(),

  issueDate: z.coerce.date(),

  expiryDate: z.coerce.date().optional(),

  skillIds: z.array(z.string()).default([]),
});

export const updateCertificateSchema =
  createCertificateSchema.partial();