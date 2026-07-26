import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createProjectController,
  getProjectsController,
  getProjectBySlugController,
  updateProjectController,
  deleteProjectController,
  getProjectByIdController,
  getProjectCardsController,
  getFeaturedProjectCardsController,
} from "./project.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* Public Routes */

publicRouter.get("/", getProjectsController);
publicRouter.get("/cards", getProjectCardsController);
publicRouter.get("/featured", getFeaturedProjectCardsController);
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