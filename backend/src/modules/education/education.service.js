import prisma from "../../lib/prisma.js";
import {ApiError} from "../../utils/apiError.js";

export async function createEducation(data) {
  return prisma.education.create({
    data,
  });
}

export async function getEducations() {
  return prisma.education.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
}

export async function getEducationById(id) {
  const education = await prisma.education.findUnique({
    where: {
      id,
    },
  });

  if (!education) {
    throw new ApiError(404, "education not found");
  }

  return education;
}

export async function updateEducation(id, data) {
  const education = await prisma.education.findUnique({
    where: {
      id,
    },
  });

  if (!education) {
    throw new ApiError(404, "education not found");
  }

  return prisma.education.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteEducation(id) {
  const education = await prisma.education.findUnique({
    where: {
      id,
    },
  });

  if (!education) {
    throw new ApiError(404, "education not found");
  }

  return prisma.education.delete({
    where: {
      id,
    },
  });
}