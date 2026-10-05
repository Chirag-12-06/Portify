import { answerQuestion } from "./services/core/querying/rag.service.js";

import {
  createQuestion as createQuestionService,
  getQuestions as getQuestionsService,
  getQuestionById,
  updateQuestion as updateQuestionService,
  deleteQuestion as deleteQuestionService,
} from "./rag.service.js";

import {
  createRagQuestionSchema,
  updateRagQuestionSchema,
} from "./rag.validation.js";

// Create a Q&A entry
export async function createQuestion(req, res, next) {
  try {
    const validatedData = createRagQuestionSchema.parse(req.body);

    const question = await createQuestionService(validatedData);

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
}


// Ask a question using RAG
export async function askQuestion(req, res, next) {
  try {
    const { question } = req.body;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const normalizedQuestion = question.trim();

    // Check existing Q&A or generate a new answer
    const result = await answerQuestion(normalizedQuestion);

    // Save only if no existing Q&A was found
    if (!result.cached && result.answer) {
      await createQuestionService({
        question: normalizedQuestion,
        answer: result.answer,
        category: result.source,
        isPublished: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// Get all Q&A entries
export async function getQuestions(req, res, next) {
  try {
    const questions = await getQuestionsService();

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
}

// Get a single Q&A entry
export async function getQuestion(req, res, next) {
  try {
    const question = await getQuestionById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

// Update a Q&A entry
export async function updateQuestion(req, res, next) {
  try {
    const validatedData = updateRagQuestionSchema.parse(req.body);

    const question = await updateQuestionService(req.params.id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

// Delete a Q&A entry
export async function deleteQuestion(req, res, next) {
  try {
    await deleteQuestionService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
