import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createCertificateController,
  getCertificatesController,
  getCertificateByIdController,
  updateCertificateController,
  deleteCertificateController,
} from "./certificate.controller.js";

const publicRouter = Router();
const adminRouter = Router();

/* ---------- Public Routes ---------- */

publicRouter.get("/", getCertificatesController);
publicRouter.get("/:id", getCertificateByIdController);

/* ---------- Admin Routes ---------- */

adminRouter.use(authenticate);

adminRouter.post("/", createCertificateController);
adminRouter.put("/:id", updateCertificateController);
adminRouter.delete("/:id", deleteCertificateController);

export { publicRouter, adminRouter };