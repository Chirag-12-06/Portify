import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

const projectInclude = {
  gallery: {
    orderBy: {
      displayOrder: "asc",
    },
  },

  skills: {
    include: {
      skill: true,
    },
  },

  techs: {
    include: {
      tech: true,
    },
  },
};

async function ensureProjectExists(id) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
}

export async function createProject(data) {
  const { gallery, skillIds, techIds, ...projectData } = data;

  return prisma.project.create({
    data: {
      ...projectData,

      gallery: {
        create: gallery,
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

      techs: {
        create: techIds.map((techId) => ({
          tech: {
            connect: {
              id: techId,
            },
          },
        })),
      },
    },

    include: projectInclude,
  });
}

export async function getProjects() {
  return prisma.project.findMany({
    include: projectInclude,

    orderBy: [
      {
        featured: "desc",
      },
      {
        displayOrder: "asc",
      },
    ],
  });
}

export async function getProjectById(id) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },

    include: projectInclude,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
}

export async function getProjectBySlug(slug) {
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },

    include: projectInclude,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
}

export async function updateProject(id, data) {
  await ensureProjectExists(id);

  const { gallery, skillIds, techIds, ...projectData } = data;

  return prisma.project.update({
    where: {
      id,
    },

    data: {
      ...projectData,

      ...(gallery !== undefined && {
        gallery: {
          deleteMany: {},
          create: gallery,
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

      ...(techIds !== undefined && {
        techs: {
          deleteMany: {},
          create: techIds.map((techId) => ({
            tech: {
              connect: {
                id: techId,
              },
            },
          })),
        },
      }),
    },

    include: projectInclude,
  });
}

export async function deleteProject(id) {
  await ensureProjectExists(id);

  return prisma.project.delete({
    where: {
      id,
    },
  });
}