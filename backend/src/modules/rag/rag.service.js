// Adjust this import to match your existing Prisma client location.
import prisma from "../../lib/prisma.js";

import { generateEmbeddings } from "./services/core/indexing/embedding.service.js";

/**
 * Create a new Q&A entry.
 *
 * @param {Object} data
 * @param {string} data.question
 * @param {string} data.answer
 * @param {number[]} data.embedding
 * @param {string} [data.category]
 */

export async function createQuestion({ question, answer, category = null }) {
  if (!question?.trim()) {
    throw new Error("Question is required");
  }

  if (!answer?.trim()) {
    throw new Error("Answer is required");
  }

  const normalizedQuestion = question.trim();

  // Generate embedding from the question
  const embedding = await generateEmbeddings(normalizedQuestion);

  if (
    !Array.isArray(embedding) ||
    embedding.length !== 384 ||
    !embedding.every(Number.isFinite)
  ) {
    throw new Error("Failed to generate a valid question embedding");
  }

  // Convert embedding array to PostgreSQL vector format
  const vector = `[${embedding.join(",")}]`;

  // Insert question and embedding using raw SQL
  const [createdQuestion] = await prisma.$queryRaw`
    INSERT INTO "RagQuestion" (
      "id",
      "question",
      "answer",
      "embedding",
      "category",
      "isPublished",
      "createdAt",
      "updatedAt"
    )
    VALUES (
      gen_random_uuid()::text,
      ${normalizedQuestion},
      ${answer.trim()},
      ${vector}::vector,
      ${category},
      true,
      NOW(),
      NOW()
    )
    RETURNING
      "id",
      "question",
      "answer",
      "category",
      "isPublished",
      "createdAt",
      "updatedAt"
  `;

  return createdQuestion;
}

/**
 * Fetch all Q&A entries.
 */
export async function getQuestions() {
  return prisma.ragQuestion.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      question: true,
      answer: true,
      category: true,
      isPublished: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

/**
 * Fetch a single Q&A entry by ID.
 */
export async function getQuestionById(id) {
  return prisma.ragQuestion.findUnique({
    where: { id },
  });
}

/**
 * Update an existing Q&A entry.
 */
export async function updateQuestion(id, data) {
  const existingQuestion = await prisma.ragQuestion.findUnique({
    where: { id },
  });

  if (!existingQuestion) {
    throw new Error("Question not found");
  }

  let embedding;

  if (data.question !== undefined) {
    const normalizedQuestion = data.question.trim();

    embedding = await generateEmbeddings(normalizedQuestion);

    if (
      !Array.isArray(embedding) ||
      embedding.length !== 384 ||
      !embedding.every(Number.isFinite)
    ) {
      throw new Error("Failed to generate a valid question embedding");
    }
  }

  const updatedQuestion = await prisma.$queryRaw`
    UPDATE "RagQuestion"
    SET
      "question" = COALESCE(
        ${question !== undefined ? question.trim() : null},
        "question"
      ),
      "answer" = COALESCE(
        ${answer !== undefined ? answer.trim() : null},
        "answer"
      ),
      "category" = COALESCE(
        ${category !== undefined ? category : null},
        "category"
      ),
      "isPublished" = COALESCE(
        ${isPublished !== undefined ? isPublished : null},
        "isPublished"
      ),
      "embedding" = COALESCE(
        ${embedding}::vector,
        "embedding"
      ),
      "updatedAt" = NOW()
    WHERE "id" = ${id}
    RETURNING
      "id",
      "question",
      "answer",
      "category",
      "isPublished",
      "createdAt",
      "updatedAt"
  `;

  if (!updatedQuestion.length) {
    throw new Error("Question not found");
  }

  return updatedQuestion[0];
}

/**
 * Delete a Q&A entry.
 */
export async function deleteQuestion(id) {
  return prisma.ragQuestion.delete({
    where: { id },
  });
}
