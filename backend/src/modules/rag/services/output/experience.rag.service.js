import { generateExperienceDocument } from "../source/experience.document.js";
import { indexDocument } from "../core/indexing/index.service.js";

export async function indexExperience(experienceId) {
  const document = await generateExperienceDocument(experienceId);

  return indexDocument(document);
}