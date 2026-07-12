import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import { adminRouter as projectRoutes } from "../modules/project/project.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);

export default router;