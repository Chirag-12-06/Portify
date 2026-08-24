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

  // --------------------------------
  // 1. Match portfolio terms
  // --------------------------------

  const matches = await matchTerms(question);

  console.dir(matches, { depth: null });

  let chunks = [];

  // Tracks whether the question explicitly
  // asks about projects and we attempted
  // structured project retrieval.
  let structuredProjectQuery = false;


  // --------------------------------
  // 2. Exact project title match
  // --------------------------------

  if (matches.projects.length > 0) {
    structuredProjectQuery = true;

    const projectIds = matches.projects.map(
      (project) => project.id
    );

    console.log("PROJECT MATCH");
    console.log("Project IDs:", projectIds);

    chunks = await searchChunksByProjectIds(
      projectIds
    );
  }


  // --------------------------------
  // 3. Project + skill match
  // --------------------------------

  if (
    chunks.length === 0 &&
    matches.sourceType === "PROJECT" &&
    matches.skills.length > 0
  ) {
    structuredProjectQuery = true;

    const skillIds = matches.skills.map(
      (skill) => skill.id
    );

    console.log("SKILL → PROJECT MATCH");
    console.log("Skill IDs:", skillIds);

    chunks = await searchChunksBySkillIds(
      skillIds
    );
  }


  // --------------------------------
  // 4. Project + technology match
  // --------------------------------

  if (
    chunks.length === 0 &&
    matches.sourceType === "PROJECT" &&
    matches.technologies.length > 0
  ) {
    structuredProjectQuery = true;

    const technologyIds =
      matches.technologies.map(
        (technology) => technology.id
      );

    console.log("TECHNOLOGY → PROJECT MATCH");
    console.log(
      "Technology IDs:",
      technologyIds
    );

    chunks =
      await searchChunksByTechnologyIds(
        technologyIds
      );
  }


  // --------------------------------
  // 5. Explicit project query but
  //    no matching project found
  // --------------------------------

  if (
    structuredProjectQuery &&
    chunks.length === 0
  ) {
    console.log(
      "NO MATCHING PROJECT FOUND"
    );

    return {
      answer:
        "I don't have any projects matching that requirement.",

      sources: [],

      matches,
    };
  }


  // --------------------------------
  // 6. Semantic fallback
  // --------------------------------

  if (chunks.length === 0) {
    console.log(
      "NO STRUCTURED MATCH → VECTOR SEARCH"
    );

    const [queryEmbedding] =
      await generateEmbeddings([question]);

    chunks = await searchSimilarChunks(
      queryEmbedding,
      5
    );
  }


  // --------------------------------
  // 7. Generate answer
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