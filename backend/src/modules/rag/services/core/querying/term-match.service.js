import prisma from "../../../../../lib/prisma.js";
import Keywords from "../../keywords/keywords.json" with { type: "json" };

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsTerm(question, term) {
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|\\s)${escapedTerm}(?=\\s|$)`);

  return regex.test(question);
}

function detectIntent(question) {
  const text = normalize(question);

  const intent = {
    github: Keywords.github.some((keyword) =>
      containsTerm(text, normalize(keyword)),
    ),

    leetcode: Keywords.leetcode.some((keyword) =>
      containsTerm(text, normalize(keyword)),
    ),

    project: Keywords.project.some((keyword) =>
      containsTerm(text, normalize(keyword)),
    ),

    certificate: Keywords.certificate.some((keyword) =>
      containsTerm(text, normalize(keyword)),
    ),

    experience: Keywords.experience.some((keyword) =>
      containsTerm(text, normalize(keyword)),
    ),
  };

  intent.general = !Object.values(intent).some(Boolean);

  return intent;
}

export async function matchTerms(question) {
  const normalizedQuestion = normalize(question);

  const [skills, technologies, projects] = await Promise.all([
    prisma.skill.findMany({
      select: { id: true, name: true },
    }),

    prisma.tech.findMany({
      select: { id: true, name: true },
    }),

    prisma.project.findMany({
      select: { id: true, title: true },
    }),
  ]);

  const matchedSkills = skills.filter((skill) =>
    containsTerm(normalizedQuestion, normalize(skill.name)),
  );

  const matchedTechnologies = technologies.filter((tech) =>
    containsTerm(normalizedQuestion, normalize(tech.name)),
  );

  const matchedProjects = projects.filter((project) =>
    containsTerm(normalizedQuestion, normalize(project.title)),
  );

  return {
    intent: detectIntent(question),
    skills: matchedSkills,
    technologies: matchedTechnologies,
    projects: matchedProjects,
  };
}
