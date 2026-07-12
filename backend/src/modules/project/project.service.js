import prisma from "../../lib/prisma.js";
import {ApiError} from "../../utils/apiError.js";
import {asyncHandler} from "../../utils/asyncHandler.js";

export async function createProject(data) {
  const existingProject = await prisma.project.findUnique({
    where: {
      slug: data.slug,
    },
  });

  return prisma.project.create({
    data,
  });
}

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      images: true,
      skills: {
        include: {
          skill: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectBySlug(slug) {
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!project) {
  throw new ApiError(404, "Project not found");
}

  return project;
}

export async function updateProject(id, data) {
  const existingProject = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!existingProject) {
    throw new ApiError(404, "Project not found");
  }

  return prisma.project.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProject(id) {
  const existingProject = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!existingProject) {
    throw new ApiError(404, "Project not found");
  }

  return prisma.project.delete({
    where: {
      id,
    },
  });
}