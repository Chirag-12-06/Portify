import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function createContactMessage(data) {
  return prisma.contactMessage.create({
    data,
  });
}

export async function getContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getContactMessageById(id) {
  const contact = await prisma.contactMessage.findUnique({
    where: {
      id,
    },
  });

  if (!contact) {
    throw new ApiError(404, "contact not found");
  }

  return contact;
}

export async function updateContactMessage(id, data) {
  const message = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  return prisma.contactMessage.update({
    where: { id },
    data,
  });
}

export async function deleteContactMessage(id) {
  const message = await prisma.contactMessage.findUnique({
    where: {
      id,
    },
  });

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  return prisma.contactMessage.delete({
    where: {
      id,
    },
  });
}