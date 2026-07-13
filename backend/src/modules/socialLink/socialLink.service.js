import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function createSocialLink(data) {
  return prisma.socialLink.create({
    data,
  });
}

export async function getSocialLinks() {
  return prisma.socialLink.findMany({
    orderBy: {
      displayOrder: "asc",
    },
  });
}

export async function getSocialLinkById(id) {
  const socialLink = await prisma.socialLink.findUnique({
    where: { id },
  });

  if (!socialLink) {
    throw new ApiError(404, "Social link not found");
  }

  return socialLink;
}

export async function updateSocialLink(id, data) {
  const socialLink = await prisma.socialLink.findUnique({
    where: { id },
  });

  if (!socialLink) {
    throw new ApiError(404, "Social link not found");
  }

  return prisma.socialLink.update({
    where: { id },
    data,
  });
}

export async function deleteSocialLink(id) {
  const socialLink = await prisma.socialLink.findUnique({
    where: { id },
  });

  if (!socialLink) {
    throw new ApiError(404, "Social link not found");
  }

  return prisma.socialLink.delete({
    where: { id },
  });
}