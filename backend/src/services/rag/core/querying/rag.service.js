import { matchTerms } from "./term-match.service.js";
import { getGithubStats } from "../../../../modules/social-links/github/github.service.js";

import { generateEmbeddings } from "../indexing/embedding.service.js";

import {
  searchSimilarChunks,
  searchChunksByProjectIds,
  searchChunksBySkillIds,
  searchChunksByTechnologyIds,
  searchChunksByCertificateIds,
  searchChunksByCertificateSkillIds,
} from "./search.service.js";

import { generateAnswer, generateGithubAnswer } from "./answer.service.js";

export async function answerQuestion(question) {
  if (!question || !question.trim()) {
    throw new Error("Question is required");
  }

  const matches = await matchTerms(question);

  //GITHUB
  if (matches.sourceType === "GITHUB") {
    const githubContext = await getGithubStats();

    const answer = await generateGithubAnswer(question, githubContext);

    return {
      answer,
    };
  }

  let chunks = [];

  let structuredProjectQuery = false;
  let structuredCertificateQuery = false;

  // Project title match
  if (matches.projects.length > 0) {
    structuredProjectQuery = true;

    const projectIds = matches.projects.map((project) => project.id);

    chunks = await searchChunksByProjectIds(projectIds);
  }

  // Project + skill
  if (
    chunks.length === 0 &&
    matches.sourceType === "PROJECT" &&
    matches.skills.length > 0
  ) {
    structuredProjectQuery = true;

    const skillIds = matches.skills.map((skill) => skill.id);

    chunks = await searchChunksBySkillIds(skillIds);
  }

  // Project + technology
  if (
    chunks.length === 0 &&
    matches.sourceType === "PROJECT" &&
    matches.technologies.length > 0
  ) {
    structuredProjectQuery = true;

    const technologyIds = matches.technologies.map(
      (technology) => technology.id,
    );

    chunks = await searchChunksByTechnologyIds(technologyIds);
  }

  // No matching project
  if (structuredProjectQuery && chunks.length === 0) {
    return {
      answer: "I don't have any projects matching that requirement.",
    };
  }

  // Certificate title match
  if (matches.certificates && matches.certificates.length > 0) {
    structuredCertificateQuery = true;

    const certificateIds = matches.certificates.map(
      (certificate) => certificate.id,
    );

    chunks = await searchChunksByCertificateIds(certificateIds);
  }

  // Certificate + skill
  if (
    chunks.length === 0 &&
    matches.sourceType === "CERTIFICATE" &&
    matches.skills.length > 0
  ) {
    structuredCertificateQuery = true;

    const skillIds = matches.skills.map((skill) => skill.id);

    chunks = await searchChunksByCertificateSkillIds(skillIds);
  }

  // No matching certificate
  if (structuredCertificateQuery && chunks.length === 0) {
    return {
      answer: "I don't have any certificates matching that requirement.",
    };
  }

  // Semantic fallback
  if (chunks.length === 0) {
    const [queryEmbedding] = await generateEmbeddings([question]);

    chunks = await searchSimilarChunks(queryEmbedding, 5);
  }

  const answer = await generateAnswer(question, chunks);

  return {
    answer,
  };
}
