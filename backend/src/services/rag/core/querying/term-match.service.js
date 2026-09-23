import prisma from "../../../../lib/prisma.js";
import Keywords from "../../keywords/keywords.json";

function detectSourceType(question) {
  const text = normalize(question);

  if (Keywords.github.some((keyword) => text.includes(normalize(keyword)))) {
    return "GITHUB";
  }

  if (Keywords.project.some((keyword) => text.includes(normalize(keyword)))) {
    return "PROJECT";
  }

  if (
    Keywords.certificate.some((keyword) => text.includes(normalize(keyword)))
  ) {
    return "CERTIFICATE";
  }

  if (
    Keywords.experience.some((keyword) => text.includes(normalize(keyword)))
  ) {
    return "EXPERIENCE";
  }

  return null;
}

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
    sourceType: detectSourceType(question),

    skills: matchedSkills,

    technologies: matchedTechnologies,

    projects: matchedProjects,
  };
}
