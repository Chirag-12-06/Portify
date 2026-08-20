import prisma from "../../../lib/prisma.js";
import { generateExperienceDocument } from "../source/experience.document.js";
import { indexDocument } from "../core/index.service.js";

export async function indexExperience(experienceId) {
  const document = await generateExperienceDocument(experienceId);

  return indexDocument(document);
}