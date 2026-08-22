import prisma from "../../../lib/prisma.js";

const TOP_K = 5;
const SIMILARITY_THRESHOLD = 0.70;

export async function searchSimilarChunks(
  queryEmbedding,
  limit = TOP_K
) {
  if (!queryEmbedding || queryEmbedding.length !== 384) {
    throw new Error(
      "Query embedding must contain 384 dimensions"
    );
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

  // return results
    // .map((result) => ({
    //   ...result,
    //   similarity: Number(result.similarity),
    // }))
    // .filter(
    //   (result) =>
    //     result.similarity >= SIMILARITY_THRESHOLD
    // );
    return results.map((result) => ({
  ...result,
  similarity: Number(result.similarity),
}));
}
