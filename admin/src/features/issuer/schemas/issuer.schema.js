import { z } from "zod";

export const issuerSchema = z.object({
  name: z.string().trim().min(1),

  logo: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(z.url().optional()),
});

export const defaultValues = {
  name: "",
  logo: "",
};