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

const projectSelect = {
  // id: true,
  title: true,
  shortDescription: true,
  fullDescription: true,
  status: true,
  projectYear: true,
  thumbnailUrl: true,
  githubUrl: true,
  liveUrl: true,

  gallery: {
    select: {
      // id: true,
      imageUrl: true,
      caption: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  },

  techs: {
    select: {
      tech: {
        select: {
          // id: true,
          name: true,
          imageUrl: true,
          category: true,
        },
      },
    },
  },

  skills: {
    select: {
      skill: {
        select: {
          // id: true,
          name: true,
        },
      },
    },
  },
};

const projectCardSelect = {
  id: true,
  slug: true,
  title: true,
  shortDescription: true,
  status: true,
  projectYear: true,
  thumbnailUrl: true,
  githubUrl: true,
  liveUrl: true,
  techs: {
    select: {
      tech: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  },
};

const featuredProjectCardSelect = {
  id: true,
  slug: true,
  title: true,
  shortDescription: true,
  status: true,
  projectYear: true,
  thumbnailUrl: true,
  githubUrl: true,
  liveUrl: true,
  techs: {
    select: {
      tech: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
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
    where: { slug },
    select: projectSelect,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return {
    ...project,

    techs: project.techs.map(({ tech }) => tech),

    skills: project.skills.map(({ skill }) => skill),
  };
}

export async function getProjectCards() {
  const projects = await prisma.project.findMany({
    where: {
      isVisible: true,
    },

    select: projectCardSelect,

    orderBy: [
      {
        featured: "desc",
      },
      {
        displayOrder: "asc",
      },
    ],
  });

  return projects.map((project) => ({
    ...project,
    techs: project.techs.map(({ tech }) => tech),
  }));
}

export async function getFeaturedProjectCards() {
  const projects = await prisma.project.findMany({
    where: {
      isVisible: true,
      featured: true,
    },

    select: featuredProjectCardSelect,

    orderBy: {
      displayOrder: "asc",
    },
  });

  return projects.map((project) => ({
    ...project,
    techs: project.techs.map(({ tech }) => tech),
  }));
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
