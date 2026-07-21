import { z } from "zod";

export const createIssuerSchema = z.object({
  name: z.string().trim().min(1, "Issuer name is required"),

  logo: z
    .string()
    .url("Invalid logo URL")
    .optional(),
});

export const updateIssuerSchema =
  createIssuerSchema.partial();