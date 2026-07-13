import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  getProfileController,
  updateProfileController,
} from "./profile.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getProfileController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.put("/", updateProfileController);

export { publicRouter, adminRouter };