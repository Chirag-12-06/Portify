import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createEducationController,
  getEducationsController,
  getEducationByIdController,
  updateEducationController,
  deleteEducationController,
} from "./education.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getEducationsController);
publicRouter.get("/:id", getEducationByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createEducationController);
adminRouter.put("/:id", updateEducationController);
adminRouter.delete("/:id", deleteEducationController);

export { publicRouter, adminRouter };