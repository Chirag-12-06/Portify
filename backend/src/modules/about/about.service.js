import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function getAbout() {
  const about = await prisma.about.findFirst({
    select: {
      id: true,
      heading: true,
      content: true,
      highlights: {
        select: {
          id: true,
          stat: true,
          label: true,
        },
      },
    },
  });

  if (!about) {
    throw new ApiError(404, "About not found");
  }

  return about;
}

export async function updateAbout(data) {
  const about = await prisma.about.findFirst();

  if (!about) {
    throw new ApiError(404, "About not found");
  }

  const { highlights = [], ...aboutData } = data;

  return prisma.about.update({
    where: {
      id: about.id,
    },
    data: {
      ...aboutData,

      highlights: {
        deleteMany: {},

        create: highlights.map((highlight, index) => ({
          stat: highlight.stat,
          label: highlight.label,
          order: index,
        })),
      },
    },
    include: {
      highlights: true,
    },
  });
}
