import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().trim().optional(),

  location: z.string().trim().optional(),

  resumeUrl: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Invalid resume URL").optional(),
  ),

  profileImageUrl: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Invalid profile image URL").optional(),
  ),
});

export const defaultValues = {
      name: "",
      email: "",
      phone: "",
      location: "",
      resumeUrl: "",
      profileImageUrl: "",
    };
