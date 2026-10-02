import prisma from "../../../../../lib/prisma.js";
import { generateEmbeddings } from "../indexing/embedding.service.js";


/**
 * Find the most similar question in the Q&A knowledge base.
 *
 * @param {string} question - User's question
 * @returns {Object|null} Similar question with its answer and score
 */

const SIMILARITY_THRESHOLD = 0.85;


export async function findSimilarQuestion(question) {
  if (!question?.trim()) {
    throw new Error("Question is required");
  }

  // 1. Generate embedding for the incoming question
  const embedding = await generateEmbeddings(question);

  if (!embedding || embedding.length !== 384) {
    throw new Error("Invalid question embedding");
  }

  // 2. Convert embedding array into pgvector format
  const vector = `[${embedding.join(",")}]`;

  // 3. Search for the most similar stored question
  const results = await prisma.$queryRaw`
    SELECT
      id,
      question,
      answer,
      category,
      1 - (embedding <=> ${vector}::vector) AS similarity
    FROM "RagQuestion"
    WHERE embedding IS NOT NULL
      AND "isPublished" = true
    ORDER BY embedding <=> ${vector}::vector
    LIMIT 1
  `;

  if (!results.length) {
    return null;
  }

  const match = results[0];

  const similarity = Number(match.similarity);

  if (similarity < SIMILARITY_THRESHOLD) {
    return null;
  }

  // 5. Return the matching question and its stored answer
  return {
    id: match.id,
    question: match.question,
    answer: match.answer,
    category: match.category,
    similarity,
  };
}
