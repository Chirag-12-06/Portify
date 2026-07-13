import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function createExperience(data) {
  const { points, skillIds, ...experienceData } = data;

  return prisma.experience.create({
    data: {
      ...experienceData,

      points: {
        create: points,
      },

      skills: {
        create: skillIds.map((skillId) => ({
          skill: {
            connect: {
              id: skillId,
            },
          },
        })),
      },
    },

    include: {
      points: {
        orderBy: {
          displayOrder: "asc",
        },
      },

      skills: {
        include: {
          skill: true,
        },
      },
    },
  });
}

export async function getExperiences() {
  return prisma.experience.findMany({
    include: {
      points: {
        orderBy: {
          displayOrder: "asc",
        },
      },

      skills: {
        include: {
          skill: true,
        },
      },
    },

    orderBy: {
      startDate: "desc",
    },
  });
}

export async function getExperienceById(id) {
  const experience = await prisma.experience.findUnique({
    where: { id },

    include: {
      points: {
        orderBy: {
          displayOrder: "asc",
        },
      },

      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return experience;
}

export async function updateExperience(id, data) {
  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  const { points, skillIds, ...experienceData } = data;

  return prisma.experience.update({
    where: { id },

    data: {
      ...experienceData,

      ...(points !== undefined && {
        points: {
          deleteMany: {},
          create: points,
        },
      }),

      ...(skillIds !== undefined && {
        skills: {
          deleteMany: {},
          create: skillIds.map((skillId) => ({
            skill: {
              connect: {
                id: skillId,
              },
            },
          })),
        },
      }),
    },

    include: {
      points: {
        orderBy: {
          displayOrder: "asc",
        },
      },

      skills: {
        include: {
          skill: true,
        },
      },
    },
  });
}

export async function deleteExperience(id) {
  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return prisma.experience.delete({
    where: { id },
  });
}