import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createSkillController,
  resolveSkillController,
  getSkillsController,
  getSkillByIdController,
  updateSkillController,
  deleteSkillController,
} from "./rag.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getSkillsController);
publicRouter.get("/:id", getSkillByIdController);


/* ---------- Admin Routes ---------- */
adminRouter.post("/", createSkillController);
adminRouter.put("/:id", updateSkillController);
adminRouter.delete("/:id", deleteSkillController);

export {publicRouter, adminRouter};