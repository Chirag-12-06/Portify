import { matchTerms } from "./term-match.service.js";

import { generateEmbeddings } from "../indexing/embedding.service.js";

import {
  searchSimilarChunks,
  searchChunksByProjectIds,
  searchChunksBySkillIds,
  searchChunksByTechnologyIds,
} from "./search.service.js";

import { generateAnswer } from "./answer.service.js";


export async function answerQuestion(question) {
  if (!question || !question.trim()) {
    throw new Error("Question is required");
  }

  // 1. Detect exact portfolio terms
  const matches = await matchTerms(question);

  console.dir(matches, { depth: null });

  let chunks = [];

  // --------------------------------
  // 2. Direct project match
  // --------------------------------

  if (matches.projects.length > 0) {
    const projectIds = matches.projects.map(
      (project) => project.id
    );

    chunks = await searchChunksByProjectIds(projectIds);
  }

  // --------------------------------
  // 3. Skill match
  // --------------------------------

  if (
    chunks.length === 0 &&
    matches.skills.length > 0
  ) {
    const skillIds = matches.skills.map(
      (skill) => skill.id
    );

    chunks = await searchChunksBySkillIds(skillIds);
  }

  // --------------------------------
  // 4. Technology match
  // --------------------------------

  if (
    chunks.length === 0 &&
    matches.technologies.length > 0
  ) {
    const technologyIds =
      matches.technologies.map(
        (technology) => technology.id
      );

    chunks =
      await searchChunksByTechnologyIds(
        technologyIds
      );
  }

  // --------------------------------
  // 5. Semantic fallback
  // --------------------------------

  if (chunks.length === 0) {
    const [queryEmbedding] =
      await generateEmbeddings([question]);

    chunks = await searchSimilarChunks(
      queryEmbedding,
      5
    );
  }

  // --------------------------------
  // 6. Generate answer
  // --------------------------------

  const answer = await generateAnswer(
    question,
    chunks
  );

  return {
    answer,
    sources: chunks,
    matches,
  };
}