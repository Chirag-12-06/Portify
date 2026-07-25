import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  getAboutController,
  updateAboutController,
} from "./about.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getAboutController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.put("/", updateAboutController);

adminRouter.get("/", getAboutController);
adminRouter.get("/:id", getAboutController);


export { publicRouter, adminRouter };