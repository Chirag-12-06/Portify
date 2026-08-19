import { generateProjectDocument } from "./sources/project.document.js";
import { indexDocument } from "./core/index.service.js";

export async function indexProject(projectId) {
  const document = await generateProjectDocument(projectId);

  return indexDocument(document);
}