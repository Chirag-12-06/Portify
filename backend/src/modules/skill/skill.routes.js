import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createSkillController,
  getSkillsController,
  getSkillByIdController,
  updateSkillController,
  deleteSkillController,
} from "./skill.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getSkillsController);
publicRouter.get("/:id", getSkillByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createSkillController);
adminRouter.put("/:id", updateSkillController);
adminRouter.delete("/:id", deleteSkillController);
adminRouter.get("/", getSkillsController);
adminRouter.get("/:id", getSkillByIdController);

export { publicRouter, adminRouter };