import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createSocialLinkController,
  getSocialLinksController,
  getSocialLinkByIdController,
  updateSocialLinkController,
  deleteSocialLinkController,
} from "./socialLink.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getSocialLinksController);
publicRouter.get("/:id", getSocialLinkByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createSocialLinkController);
adminRouter.put("/:id", updateSocialLinkController);
adminRouter.delete("/:id", deleteSocialLinkController);
adminRouter.get("/", getSocialLinksController);

export { publicRouter, adminRouter };