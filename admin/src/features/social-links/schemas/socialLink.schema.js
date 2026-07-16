import { z } from "zod";

import { PLATFORMS } from "../constants/Platforms";

export const socialLinkSchema = z.object({
  platform: z.enum(PLATFORMS),

  url: z
    .string()
    .trim()
    .url("Enter a valid URL"),

  displayOrder: z
    .number()
    .min(1, "Display order must be at least 1"),
});

export const defaultValues = {
  platform: "GITHUB",
  url: "",
  displayOrder: 1,
};