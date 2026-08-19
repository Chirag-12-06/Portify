// core/index.service.js

import prisma from "../../../lib/prisma.js";
import { createChunks } from "./chunk.service.js";
import { generateEmbeddings } from "./embedding.service.js";
import { saveChunks } from "./vector.service.js";

export async function indexDocument(document) {
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

  const chunks = createChunks(
    document.content,
    ragDocument.id
  );

  const embeddings = await generateEmbeddings(
    chunks.map((chunk) => chunk.content)
  );

  const indexedChunks = chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index],
  }));

  const savedChunks = await saveChunks(
    ragDocument.id,
    indexedChunks
  );

  return {
    document: ragDocument,
    chunks: savedChunks,
  };
}