import prisma from "../../lib/prisma.js";

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

export async function indexProjectDocument(projectId) {
  const document = await generateProjectDocument(projectId);

  const ragDocument = await prisma.ragDocument.upsert({
    where: {
      sourceType_sourceId: {
        sourceType: document.sourceType,
        sourceId: document.sourceId,
      },
    },

    create: {
      sourceType: document.sourceType,
      sourceId: document.sourceId,
      title: document.title,
      skills: document.skills,
      technologies: document.technologies,
    },

    update: {
      title: document.title,
      skills: document.skills,
      technologies: document.technologies,
    },
  });

  return {
    ...ragDocument,
    content: document.content,
  };
}