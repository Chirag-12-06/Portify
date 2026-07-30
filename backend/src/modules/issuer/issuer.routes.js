import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createIssuerController,
  getIssuersController,
  getIssuerByIdController,
  updateIssuerController,
  deleteIssuerController,
} from "./issuer.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getIssuersController);
publicRouter.get("/:id", getIssuerByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createIssuerController);
adminRouter.put("/:id", updateIssuerController);
adminRouter.delete("/:id", deleteIssuerController);
adminRouter.get("/", getIssuersController);
adminRouter.get("/:id", getIssuerByIdController);

export { publicRouter, adminRouter };