import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function createIssuer(data) {
  return prisma.issuer.create({
    data,
  });
}

export async function getIssuers() {
  return prisma.issuer.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getIssuerById(id) {
  const issuer = await prisma.issuer.findUnique({
    where: { id },
  });

  if (!issuer) {
    throw new ApiError(404, "Issuer not found");
  }

  return issuer;
}

export async function updateIssuer(id, data) {
  const issuer = await prisma.issuer.findUnique({
    where: { id },
  });

  if (!issuer) {
    throw new ApiError(404, "Issuer not found");
  }

  return prisma.issuer.update({
    where: { id },
    data,
  });
}

export async function deleteIssuer(id) {
  const issuer = await prisma.issuer.findUnique({
    where: { id },
  });

  if (!issuer) {
    throw new ApiError(404, "Issuer not found");
  }

  return prisma.issuer.delete({
    where: { id },
  });
}