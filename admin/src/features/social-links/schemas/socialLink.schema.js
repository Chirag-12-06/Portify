import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.enum([
    "GITHUB",
    "LINKEDIN",
    "LEETCODE",
    "CODEFORCES",
    "CODECHEF",
    "HACKERRANK",
    "TWITTER",
    "INSTAGRAM",
    "EMAIL",
    "OTHER",
  ]),
  url: z.string().url("Enter a valid URL"),
  displayOrder: z
    .number()
    .min(1, "Display order must be at least 1"),
});