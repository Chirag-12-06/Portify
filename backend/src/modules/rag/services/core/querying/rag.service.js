import { chunksExtractor } from "./chunk.extractor.service.js";
import { matchTerms } from "./term-match.service.js";

import { findSimilarQuestion } from "./question.search.service.js";

import {
  generateAnswer,
  generateGithubAnswer,
  generateLeetCodeAnswer,
} from "./answer.service.js";

export async function answerQuestion(question) {
  if (!question || !question.trim()) {
    throw new Error("Question is required");
  }

  // 1. Check if a similar question already exists
  const existing = await findSimilarQuestion(question);

  if (existing) {
    return {
      answer: existing.answer,
      source: "QNA",
      cached: true,
    };
  }

  // 2. No suitable Q&A found, continue with existing RAG logic
  const matches = await matchTerms(question);

  // GITHUB
  if (matches.sourceType === "GITHUB") {
    return {
      answer: await generateGithubAnswer(question),
      source: "GITHUB",
      cached: false,
    };
  }

  // LEETCODE
  if (matches.sourceType === "LEETCODE") {
    return {
      answer: await generateLeetCodeAnswer(question),
      source: "LEETCODE",
      cached: false,
    };
  }

  // PORTFOLIO
  const chunks = await chunksExtractor(matches, question);

  if (!chunks.length) {
    const fallbackMessages = {
      PROJECT: "I don't have any projects matching that requirement.",
      CERTIFICATE: "I couldn't find any matching certificates.",
      EXPERIENCE: "I couldn't find any matching experience details.",
    };

    return {
      answer:
        fallbackMessages[matches.sourceType] ??
        "I couldn't find enough relevant information to answer that question.",
      source: matches.sourceType,
      cached: false,
    };
  }

  const answer = await generateAnswer(question, chunks);

  return {
    answer,
    source: matches.sourceType,
    cached: false,
  };
}
