import { generateProjectDocument } from "../source/project.document.js";
import { indexDocument } from "../core/indexing/index.service.js";

export async function indexProject(projectId) {
  const document = await generateProjectDocument(projectId);

  return indexDocument(document);
}