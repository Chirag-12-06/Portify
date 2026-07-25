import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  getHeroController,
  updateHeroController,
} from "./hero.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getHeroController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.put("/", updateHeroController);

adminRouter.get("/", getHeroController);
adminRouter.get("/:id", getHeroController);


export { publicRouter, adminRouter };