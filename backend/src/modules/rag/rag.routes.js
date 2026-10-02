import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  askQuestion,
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from "./rag.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */
publicRouter.post("/ask", askQuestion);

/* ---------- Admin Routes ---------- */
adminRouter.use(authenticate);
adminRouter.post("/questions", createQuestion);
adminRouter.get("/questions", getQuestions);
adminRouter.get("/questions/:id", getQuestion);
adminRouter.patch("/questions/:id", updateQuestion);
adminRouter.delete("/questions/:id", deleteQuestion);

export { publicRouter, adminRouter };