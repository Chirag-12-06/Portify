import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createTechController,
  getTechsController,
  getTechByIdController,
  updateTechController,
  deleteTechController,
} from "./technology.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getTechsController);
publicRouter.get("/:id", getTechByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createTechController);
adminRouter.put("/:id", updateTechController);
adminRouter.delete("/:id", deleteTechController);
adminRouter.get("/", getTechsController);
adminRouter.get("/:id", getTechByIdController);

export { publicRouter, adminRouter };