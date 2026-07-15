import prisma from "../../lib/prisma.js";

export async function getDashboardStats() {
  const [
    projects,
    skills,
    certificates,
    experiences,
    education,
    unreadMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certificate.count(),
    prisma.experience.count(),
    prisma.education.count(),
    prisma.contactMessage.count({
      where: {
        isRead: false,
      },
    }),
  ]);

  return {
    projects,
    skills,
    certificates,
    experiences,
    education,
    unreadMessages,
  };
}
