import prisma from "../../../../lib/prisma.js";

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function matchTerms(question) {
  const normalizedQuestion = normalize(question);

  const [skills, technologies, projects] = await Promise.all([
    prisma.skill.findMany({
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.tech.findMany({
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.project.findMany({
      select: {
        id: true,
        title: true,
      },
    }),
  ]);

  const matchedSkills = skills.filter((skill) =>
    normalizedQuestion.includes(normalize(skill.name)),
  );

  const matchedTechnologies = technologies.filter((tech) =>
    normalizedQuestion.includes(normalize(tech.name)),
  );

  const matchedProjects = projects.filter((project) =>
    normalizedQuestion.includes(normalize(project.title)),
  );

  return {
    skills: matchedSkills,
    technologies: matchedTechnologies,
    projects: matchedProjects,
  };
}
