import prisma from "../../lib/prisma.js";

export async function getDashboardStats() {
  const [
    projects,
    skills,
    techs,
    certificates,
    experiences,
    education,
    unreadMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.tech.count(),
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
    techs,
    certificates,
    experiences,
    education,
    unreadMessages,
  };
}
