import { generateProjectDocument } from "./document.service.js";
import { createChunks } from "./chunk.service.js";
import { generateEmbeddings } from "./embedding.service.js";

export async function indexProject(projectId) {
  // 1. Generate the portfolio document
  const document = await generateProjectDocument(projectId);


  console.log("DOCUMENT CONTENT:", document.content);
console.log("CONTENT LENGTH:", document.content?.length);

const chunks = createChunks(
  document.content,
  document.sourceId
);

console.log("CHUNKS:", chunks);
  // 2. Split document into chunks
  // const chunks = createChunks(document.content);

  // 3. Generate embeddings for all chunks
  const embeddings = await generateEmbeddings(
    chunks.map((chunk) => chunk.content)
  );

  // 4. Combine chunks with their vectors
  const indexedChunks = chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index],
  }));

  return {
    ...document,
    chunks: indexedChunks,
  };
}