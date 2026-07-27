import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

const certificateCardSelect = {
  id: true,
  title: true,
  credentialUrl: true,
  badgeImageUrl: true,
  issueDate: true,
  expiryDate: true,

  issuer: {
    select: {
      id: true,
      name: true,
      logo: true,
    },
  },

  skills: {
    select: {
      skill: {
        select: {
          name: true,
          category: true,
        },
      },
    },
  },
};

const featuredCertificateCardSelect = {
  id: true,
  title: true,
  credentialUrl: true,
  badgeImageUrl: true,
  issueDate: true,
  expiryDate: true,

  issuer: {
    select: {
      name: true,
      logo: true,
    },
  },

  skills: {
    select: {
      skill: {
        select: {
          name: true,
        },
      },
    },
  },
};

export async function createCertificate(data) {
  const { skillIds, ...certificateData } = data;

  return prisma.certificate.create({
    data: {
      ...certificateData,

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
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });
}

export async function getCertificates() {
  return prisma.certificate.findMany({
    include: {
      issuer: true,

      skills: {
        include: {
          skill: true,
        },
      },
    },

    orderBy: {
      issueDate: "desc",
    },
  });
}

export async function getCertificateById(id) {
  const certificate = await prisma.certificate.findUnique({
    where: { id },

    include: {
      issuer: true,

      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  return certificate;
}

export async function getCertificateCards(){
  return prisma.certificate.findMany({
    where: {
      isVisible: true,
    },
    select: certificateCardSelect,
  });
}

export async function getFeaturedCertificates() {
  return prisma.certificate.findMany({
    where: {
      featured: true,
      isVisible: true,
    },
    select: featuredCertificateCardSelect,
    orderBy: {
      displayOrder: "asc",
    },
  });
}

export async function updateCertificate(id, data) {
  const certificate = await prisma.certificate.findUnique({
    where: { id },
  });

  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  const { skillIds, ...certificateData } = data;

  return prisma.certificate.update({
    where: { id },

    data: {
      ...certificateData,

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
      issuer: true,
      
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });
}

export async function deleteCertificate(id) {
  const certificate = await prisma.certificate.findUnique({
    where: { id },
  });

  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  return prisma.certificate.delete({
    where: { id },
  });
}