import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createContactMessageController,
  getContactMessagesController,
  getContactMessageByIdController,
  updateReadStatusController,
  updateRepliedStatusController,
  deleteContactMessageController,
} from "./contact.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.post("/", createContactMessageController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);
adminRouter.get("/", getContactMessagesController);
adminRouter.get("/:id", getContactMessageByIdController);
adminRouter.patch("/:id/read", updateReadStatusController);
adminRouter.patch("/:id/replied", updateRepliedStatusController);
adminRouter.delete("/:id", deleteContactMessageController);

export { publicRouter, adminRouter };