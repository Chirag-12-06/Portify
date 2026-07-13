import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  title: z.string().trim().min(1, "Title is required"),

  tagline: z.string().trim().optional(),

  about: z.string().trim().min(1, "About is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().trim().optional(),

  location: z.string().trim().optional(),

  resumeUrl: z
    .string()
    .url("Invalid resume URL")
    .optional(),

  profileImageUrl: z
    .string()
    .url("Invalid profile image URL")
    .optional(),

  heroImageUrl: z
    .string()
    .url("Invalid hero image URL")
    .optional(),
});