import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

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