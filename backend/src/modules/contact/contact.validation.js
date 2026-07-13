import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  email: z.string().email("Invalid email"),

  subject: z.string().trim().min(1, "Subject is required"),

  message: z.string().trim().min(1, "Message is required"),
});

export const updateReadStatusSchema = z.object({
  isRead: z.boolean(),
});

export const updateRepliedStatusSchema = z.object({
  replied: z.boolean(),
});

