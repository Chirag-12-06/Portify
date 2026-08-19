import prisma from "../../../lib/prisma.js";

export async function generateProjectDocument(projectId) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
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
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const skills = project.skills.map(({ skill }) => skill.name);
  const technologies = project.techs.map(({ tech }) => tech.name);

  const content = `
Project: ${project.title}

${project.shortDescription}

${project.fullDescription}

Project Year: ${project.projectYear}

Status: ${project.status}
`.trim();

  return {
    sourceType: "PROJECT",
    sourceId: project.id,
    title: project.title,
    skills,
    technologies,
    content,
  };
}