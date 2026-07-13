import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createContactMessageController,
  getContactMessagesController,
  getContactByIdController,
  updateReadStatusController,
  updateRepliedStatusController,
  deleteContactMessageController,
} from "./contact.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getContactMessagesController);
publicRouter.get("/:id", getContactByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createContactMessageController);
adminRouter.put("/:id", updateReadStatusController);
adminRouter.put("/:id", updateRepliedStatusController);
adminRouter.delete("/:id", deleteContactMessageController);

export { publicRouter, adminRouter };