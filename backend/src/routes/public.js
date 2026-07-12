import { Router } from "express";

import { publicRouter as projectRoutes } from "../modules/project/project.routes.js";

const router = Router();

router.use("/projects", projectRoutes);

export default router;