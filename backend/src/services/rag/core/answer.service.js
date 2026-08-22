import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FALLBACK_ANSWER =
  "I couldn't find enough relevant information in my portfolio data to answer that question.";

export async function generateAnswer(question, chunks) {
  if (!chunks || chunks.length === 0) {
    return FALLBACK_ANSWER;
  }

  return chunks;

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
You are an AI assistant for a personal portfolio.

Your job is to answer questions about the portfolio owner
using ONLY the provided portfolio context.

Rules:
- Do not invent information.
- Do not use outside knowledge.
- Do not make assumptions.
- If the context does not contain enough information,
  say that the information is not available.
- Give a concise and direct answer.
- When useful, mention the relevant project, experience,
  certificate, or other source.

User Question:
${question}

Portfolio Context:
${context}
`,
  });

  return response.output_text;
}
