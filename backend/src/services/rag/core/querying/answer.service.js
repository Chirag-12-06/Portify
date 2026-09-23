import OpenAI from "openai";

import { BASE_PROMPT } from "./prompts/base.prompt.js";
import { PORTFOLIO_PROMPT } from "./prompts/portfolio.prompt.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FALLBACK_ANSWER =
  "I couldn't find enough relevant information in my portfolio data to answer that question.";

export async function generateAnswer(question, chunks) {
  if (!chunks || chunks.length === 0) {
    return FALLBACK_ANSWER;
  }

  const context = chunks
    .map(
      (chunk, index) => `
Source ${index + 1}
Type: ${chunk.sourceType}
Title: ${chunk.title}

${chunk.content}
`,
    )
    .join("\n---\n");

  const response = await openai.responses.create({
    model: "gpt-4o-mini",

    input: `
${BASE_PROMPT}

${PORTFOLIO_PROMPT}

User Question:
${question}

Portfolio Context:
${context}
`,
  });

  return response.output_text;
}
