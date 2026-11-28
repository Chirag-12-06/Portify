import {
  searchSimilarChunks,
  searchChunksByProjectIds,
  searchChunksBySkillIds,
  searchChunksByTechnologyIds,
  searchChunksByCertificateIds,
  searchChunksByCertificateSkillIds,
} from "./chunk.search.service.js";

import { generateEmbeddings } from "../indexing/embedding.service.js";

export async function chunksExtractor(matches, question) {
  const { intent, skills, technologies, projects, certificates = [] } =
    matches;

  let chunks = [];

  const projectIds = projects.map((project) => project.id);
  const skillIds = skills.map((skill) => skill.id);
  const technologyIds = technologies.map((tech) => tech.id);
  const certificateIds = certificates.map(
    (certificate) => certificate.id,
  );

  // Helper to merge results without duplicate chunks
  function mergeChunks(newChunks) {
    const existingIds = new Set(chunks.map((chunk) => chunk.id));

    for (const chunk of newChunks) {
      if (!existingIds.has(chunk.id)) {
        chunks.push(chunk);
        existingIds.add(chunk.id);
      }
    }
  }

  // 1. Explicit project intent
  if (intent.project) {
    let projectChunks = [];

    if (projectIds.length > 0) {
      projectChunks = await searchChunksByProjectIds(projectIds);
    } else if (skillIds.length > 0) {
      projectChunks = await searchChunksBySkillIds(skillIds);
    } else if (technologyIds.length > 0) {
      projectChunks = await searchChunksByTechnologyIds(technologyIds);
    }

    mergeChunks(projectChunks);
  }

  // 2. Explicit certificate intent
  if (intent.certificate) {
    let certificateChunks = [];

    if (certificateIds.length > 0) {
      certificateChunks =
        await searchChunksByCertificateIds(certificateIds);
    } else if (skillIds.length > 0) {
      certificateChunks =
        await searchChunksByCertificateSkillIds(skillIds);
    } else {
      // Add a function to retrieve all certificate chunks
      certificateChunks = await searchAllCertificateChunks();
    }

    mergeChunks(certificateChunks);
  }

  // 3. Explicit experience intent
  if (intent.experience) {
    let experienceChunks = [];

    // Add experience-specific retrieval functions here.
    // Example:
    // experienceChunks = await searchChunksByExperienceSkillIds(skillIds);

    mergeChunks(experienceChunks);
  }

  // 4. General intent with matched entities
  if (intent.general) {
    if (skillIds.length > 0 || technologyIds.length > 0) {
      const [projectChunks, certificateChunks] = await Promise.all([
        skillIds.length > 0
          ? searchChunksBySkillIds(skillIds)
          : Promise.resolve([]),

        skillIds.length > 0
          ? searchChunksByCertificateSkillIds(skillIds)
          : Promise.resolve([]),
      ]);

      mergeChunks(projectChunks);
      mergeChunks(certificateChunks);

      if (technologyIds.length > 0) {
        const technologyChunks =
          await searchChunksByTechnologyIds(technologyIds);

        mergeChunks(technologyChunks);
      }
    }
  }

  // 5. Semantic fallback
  if (chunks.length === 0) {
    const [queryEmbedding] = await generateEmbeddings([question]);

    chunks = await searchSimilarChunks(queryEmbedding, 5);
  }

  return chunks;
}

