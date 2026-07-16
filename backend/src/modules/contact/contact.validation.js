import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),

  email: z.string().trim().toLowerCase().email("Invalid email"),

  subject: z.string().trim().min(1).max(100),

  message: z.string().trim().min(1, "Message is required").max(5000),
});

export const updateReadStatusSchema = z.object({
  isRead: z.boolean(),
});

export const updateRepliedStatusSchema = z.object({
  replied: z.boolean(),
});
