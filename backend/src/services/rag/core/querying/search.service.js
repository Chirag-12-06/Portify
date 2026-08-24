import prisma from "../../../../lib/prisma.js";

const TOP_K = 5;

/**
 * Semantic/vector search.
 * Used as the fallback when exact portfolio matching
 * cannot determine the relevant source.
 */
export async function searchSimilarChunks(
  queryEmbedding,
  limit = TOP_K
) {
  if (!queryEmbedding || queryEmbedding.length !== 384) {
    throw new Error("Query embedding must contain 384 dimensions");
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

  return results.map((result) => ({
    ...result,
    similarity: Number(result.similarity),
  }));
}


/**
 * Retrieve all chunks belonging to specific projects.
 */
export async function searchChunksByProjectIds(projectIds) {
  if (!projectIds || projectIds.length === 0) {
    return [];
  }

  return prisma.ragChunk.findMany({
    where: {
      document: {
        sourceType: "PROJECT",
        sourceId: {
          in: projectIds,
        },
      },
    },

    select: {
      id: true,
      documentId: true,
      content: true,
      chunkIndex: true,

      document: {
        select: {
          sourceType: true,
          sourceId: true,
          title: true,
        },
      },
    },

    orderBy: {
      chunkIndex: "asc",
    },
  });
}


/**
 * Find projects associated with the given skills,
 * then retrieve their RAG chunks.
 */
export async function searchChunksBySkillIds(skillIds) {
  if (!skillIds || skillIds.length === 0) {
    return [];
  }

  const projects = await prisma.project.findMany({
    where: {
      skills: {
        some: {
          skillId: {
            in: skillIds,
          },
        },
      },
    },

    select: {
      id: true,
    },
  });

  const projectIds = projects.map(
    (project) => project.id
  );

  if (projectIds.length === 0) {
    return [];
  }

  return searchChunksByProjectIds(projectIds);
}


/**
 * Find projects associated with the given technologies,
 * then retrieve their RAG chunks.
 */
export async function searchChunksByTechnologyIds(
  technologyIds
) {
  if (!technologyIds || technologyIds.length === 0) {
    return [];
  }

  const projects = await prisma.project.findMany({
    where: {
      techs: {
        some: {
          techId: {
            in: technologyIds,
          },
        },
      },
    },

    select: {
      id: true,
    },
  });

  const projectIds = projects.map(
    (project) => project.id
  );

  if (projectIds.length === 0) {
    return [];
  }

  return searchChunksByProjectIds(projectIds);
}