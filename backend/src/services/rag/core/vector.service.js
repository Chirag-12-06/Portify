import crypto from "crypto";
import prisma from "../../../lib/prisma.js";

export async function saveChunks(documentId, chunks) {
  if (!documentId) {
    throw new Error("documentId is required");
  }

  if (!chunks || chunks.length === 0) {
    return [];
  }

  // Remove old chunks when re-indexing
  await prisma.ragChunk.deleteMany({
    where: {
      documentId,
    },
  });

  const savedChunks = [];

  for (const chunk of chunks) {
    const vector = `[${chunk.embedding.join(",")}]`;

    const result = await prisma.$queryRaw`
      INSERT INTO "RagChunk"
        (
          "id",
          "documentId",
          "content",
          "chunkIndex",
          "embedding",
          "createdAt",
          "updatedAt"
        )
      VALUES
        (
          ${crypto.randomUUID()},
          ${documentId},
          ${chunk.content},
          ${chunk.chunkIndex},
          ${vector}::vector,
          NOW(),
          NOW()
        )
      RETURNING
        "id",
        "documentId",
        "content",
        "chunkIndex";
    `;

    savedChunks.push(result[0]);
  }

  return savedChunks;
}
