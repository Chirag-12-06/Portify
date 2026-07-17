import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createExperienceController,
  getExperiencesController,
  getExperienceByIdController,
  updateExperienceController,
  deleteExperienceController,
} from "./experience.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getExperiencesController);
publicRouter.get("/:id", getExperienceByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createExperienceController);
adminRouter.put("/:id", updateExperienceController);
adminRouter.delete("/:id", deleteExperienceController);
adminRouter.get("/", getExperiencesController);
adminRouter.get("/:id", getExperienceByIdController);

export { publicRouter, adminRouter };