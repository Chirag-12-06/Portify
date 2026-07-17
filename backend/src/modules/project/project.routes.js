import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createProjectController,
  getProjectsController,
  getProjectBySlugController,
  updateProjectController,
  deleteProjectController,
  getProjectByIdController,
} from "./project.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* Public Routes */

publicRouter.get("/", getProjectsController);
publicRouter.get("/:slug", getProjectBySlugController);

/* Admin Routes */

adminRouter.use(authenticate);

adminRouter.post("/", createProjectController);
adminRouter.put("/:id", updateProjectController);
adminRouter.delete("/:id", deleteProjectController);
adminRouter.get("/", getProjectsController);
adminRouter.get("/:slug", getProjectBySlugController);
adminRouter.get("/:id", getProjectByIdController);

export { publicRouter, adminRouter };