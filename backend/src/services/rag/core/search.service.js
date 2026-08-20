import prisma from "../../../lib/prisma.js";

export async function searchSimilarChunks(queryEmbedding, limit = 5) {
  if (!queryEmbedding || queryEmbedding.length !== 384) {
    throw new Error("Query embedding must contain 384 dimensions");
  }

  if (limit < 1) {
    throw new Error("Limit must be greater than 0");
  }

  const vector = `[${queryEmbedding.join(",")}]`;

  const results = await prisma.$queryRaw`
    SELECT
      c.id,
      c."documentId",
      c.content,
      c."chunkIndex",
      d."sourceType",
      d."sourceId",
      d.title,
      1 - (c.embedding <=> ${vector}::vector) AS similarity
    FROM "RagChunk" c
    JOIN "RagDocument" d
      ON c."documentId" = d.id
    ORDER BY c.embedding <=> ${vector}::vector
    LIMIT ${limit};
  `;

  return results;
}
