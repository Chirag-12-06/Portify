import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

 export async function getHero() {
  const hero = await prisma.hero.findFirst();

  if (!hero) {
    throw new ApiError(404, "Hero not found");
  }

  return hero;
}

export async function updateHero(data) {
  const hero = await getHero();

  return prisma.hero.update({
    where: {
      id: hero.id,
    },
    data,
  });
}