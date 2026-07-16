import { z } from "zod";

export const createSocialLinkSchema = z.object({
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

  url: z.string().url("Invalid URL"),

  displayOrder: z.number().int().nonnegative(),
});

export const updateSocialLinkSchema =
  createSocialLinkSchema.partial();