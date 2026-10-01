import { matchTerms } from "./term-match.service.js";

import { chunksExtractor } from "./chunk.extractor.service.js";

import {
  generateAnswer,
  generateGithubAnswer,
  generateLeetCodeAnswer,
} from "./answer.service.js";

export async function answerQuestion(question) {
  if (!question || !question.trim()) {
    throw new Error("Question is required");
  }

  const matches = await matchTerms(question);

  //GITHUB
  if (matches.sourceType === "GITHUB") {
    return {
      answer: await generateGithubAnswer(question),
    };
  }

  //LEETCODE
  if (matches.sourceType === "LEETCODE") {
    return {
      answer: await generateLeetCodeAnswer(question),
    };
  }

  const chunks = await chunksExtractor(matches, question);
  const answer = await generateAnswer(question, chunks);

  return {
    answer,
  };
}
