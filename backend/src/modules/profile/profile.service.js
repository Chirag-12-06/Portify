import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function getProfile() {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
}

export async function updateProfile(data) {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return prisma.profile.update({
    where: {
      id: profile.id,
    },
    data,
  });
}