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

  // 2. Match intent and entities
  const matches = await matchTerms(question);

  const { intent } = matches;

  // 3. Handle GitHub-specific questions
  if (intent.github) {
    return {
      answer: await generateGithubAnswer(question),
      source: "GITHUB",
      cached: false,
    };
  }

  // 4. Handle LeetCode-specific questions
  if (intent.leetcode) {
    return {
      answer: await generateLeetCodeAnswer(question),
      source: "LEETCODE",
      cached: false,
    };
  }

  // 5. Retrieve relevant portfolio information
  const chunks = await chunksExtractor(matches, question);

  // 6. Handle empty retrieval results
  if (!chunks.length) {
    let answer =
      "I couldn't find enough relevant information to answer that question.";

    if (intent.project && !intent.certificate && !intent.experience) {
      answer = "I don't have any projects matching that requirement.";
    } else if (intent.certificate && !intent.project && !intent.experience) {
      answer = "I couldn't find any matching certificates.";
    } else if (intent.experience && !intent.project && !intent.certificate) {
      answer = "I couldn't find any matching experience details.";
    }

    return {
      answer,
      source: "PORTFOLIO",
      cached: false,
    };
  }

  // 7. Generate answer using retrieved context
  const answer = await generateAnswer(question, chunks);

  return {
    answer,
    source: "PORTFOLIO",
    cached: false,
  };
}
