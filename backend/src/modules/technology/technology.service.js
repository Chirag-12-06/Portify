import prisma from "../../lib/prisma.js";
import {ApiError} from "../../utils/apiError.js";

export async function createTech(data) {
  return prisma.tech.create({
    data,
  });
}

export async function getTechs(category) {
  return prisma.tech.findMany({
    where: category
      ? {
          category,
        }
      : undefined,
    orderBy: {
      name: "asc",
    },
  });
}

export async function getTechById(id) {
  const tech = await prisma.tech.findUnique({
    where: {
      id,
    },
  });

  if (!tech) {
    throw new ApiError(404, "Tech not found");
  }

  return tech;
}

export async function updateTech(id, data) {
  const tech = await prisma.tech.findUnique({
    where: {
      id,
    },
  });

  if (!tech) {
    throw new ApiError(404, "Tech not found");
  }

  return prisma.tech.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTech(id) {
  const tech = await prisma.tech.findUnique({
    where: {
      id,
    },
  });

  if (!tech) {
    throw new ApiError(404, "Tech not found");
  }

  return prisma.tech.delete({
    where: {
      id,
    },
  });
}