import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function createProject(data) {
  const { images, skillIds, ...projectData } = data;

  return prisma.project.create({
    data: {
      ...projectData,

      images: {
        create: images,
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
      images: {
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

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      images: {
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
      images: {
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

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
}

export async function updateProject(id, data) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const { images, skillIds, ...projectData } = data;

  return prisma.project.update({
    where: {
      id,
    },

    data: {
      ...projectData,

      ...(images !== undefined && {
        images: {
          deleteMany: {},
          create: images,
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
      images: {
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

export async function deleteProject(id) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return prisma.project.delete({
    where: {
      id,
    },
  });
}

export async function getProjectById(id) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },

    include: {
      images: {
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

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
}
