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


export async function createQuestion({
  question,
  answer,
  category = null,
}) {
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
export async function getQuestions({ page = 1, limit = 20, search } = {}) {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            question: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            answer: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [questions, total] = await prisma.$transaction([
    prisma.ragQuestion.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.ragQuestion.count({ where }),
  ]);

  return {
    questions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
  const { question, answer, category, isPublished } = data;

  const updateData = {};

  if (question !== undefined) {
    if (!question.trim()) {
      throw new Error("Question cannot be empty");
    }

    updateData.question = question.trim();
  }

  if (answer !== undefined) {
    if (!answer.trim()) {
      throw new Error("Answer cannot be empty");
    }

    updateData.answer = answer.trim();
  }

  if (category !== undefined) {
    updateData.category = category;
  }

  if (isPublished !== undefined) {
    updateData.isPublished = isPublished;
  }

  return prisma.ragQuestion.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete a Q&A entry.
 */
export async function deleteQuestion(id) {
  return prisma.ragQuestion.delete({
    where: { id },
  });
}
