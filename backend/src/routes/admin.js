import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import { adminRouter as projectRoutes } from "../modules/project/project.routes.js";
import { adminRouter as skillRoutes } from "../modules/skill/skill.routes.js";
import { adminRouter as certificateRoutes } from "../modules/certificate/certificate.routes.js";
import { adminRouter as experienceRoutes } from "../modules/experience/experience.routes.js";
import { adminRouter as educationRoutes } from "../modules/education/education.routes.js";
import { adminRouter as profileRoutes } from "../modules/profile/profile.routes.js";
import { adminRouter as socialLinkRoutes } from "../modules/social-links/socialLink.routes.js";
import { adminRouter as contactRoutes } from "../modules/contact/contact.routes.js";
import { adminRouter as issuerRoutes } from "../modules/issuer/issuer.routes.js";
import { adminRouter as technologyRoutes } from "../modules/technology/technology.routes.js";
import { router as dashboardRoutes } from "../modules/dashboard/dashboard.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/certificates", certificateRoutes);
router.use("/issuers", issuerRoutes);
router.use("/technologies", technologyRoutes);
router.use("/contacts", contactRoutes);
router.use("/social-links", socialLinkRoutes);
router.use("/profiles", profileRoutes);
router.use("/educations", educationRoutes);
router.use("/experiences", experienceRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
