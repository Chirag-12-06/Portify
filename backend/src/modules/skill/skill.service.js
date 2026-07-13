import prisma from "../../lib/prisma.js";
import {ApiError} from "../../utils/apiError.js";

export async function createSkill(data) {
  return prisma.skill.create({
    data,
  });
}

export async function getSkills(category) {
  return prisma.skill.findMany({
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

export async function getSkillById(id) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return skill;
}

export async function updateSkill(id, data) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return prisma.skill.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteSkill(id) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return prisma.skill.delete({
    where: {
      id,
    },
  });
}