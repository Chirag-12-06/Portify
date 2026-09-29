import prisma from "../../../lib/prisma.js";

export async function generateExperienceDocument(experienceId) {
  const experience = await prisma.experience.findUnique({
    where: {
      id: experienceId,
    },
    include: {
      points: {
        orderBy: {
          displayOrder: "asc",
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!experience) {
    throw new Error("Experience not found");
  }

  const skills = experience.skills.map(({ skill }) => skill.name);

  const startDate = experience.startDate.toISOString().split("T")[0];

  const endDate = experience.currentlyWorking
    ? "Present"
    : experience.endDate
      ? experience.endDate.toISOString().split("T")[0]
      : "N/A";

  const points = experience.points.map(({ content }) => `- ${content}`);

  const content = `
Company: ${experience.company}

Role: ${experience.role}

Location: ${experience.location ?? "N/A"}

Duration: ${startDate} to ${endDate}

Responsibilities and Achievements:
${points.join("\n")}

Skills:
${skills.join(", ")}
`.trim();

  return {
    sourceType: "EXPERIENCE",
    sourceId: experience.id,
    title: `${experience.role} at ${experience.company}`,
    skills,
    technologies: [],
    content,
  };
}
