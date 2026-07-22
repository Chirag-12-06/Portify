import { Router } from "express";

import { publicRouter as projectRoutes } from "../modules/project/project.routes.js";
import { publicRouter as skillRoutes } from "../modules/skill/skill.routes.js";
import { publicRouter as certificateRoutes } from "../modules/certificate/certificate.routes.js";
import { publicRouter as experienceRoutes } from "../modules/experience/experience.routes.js";
import { publicRouter as educationRoutes } from "../modules/education/education.routes.js";
import { publicRouter as profileRoutes } from "../modules/profile/profile.routes.js";
import { publicRouter as contactRoutes } from "../modules/contact/contact.routes.js";
import { publicRouter as issuerRoutes } from "../modules/issuer/issuer.routes.js";
import { publicRouter as technologyRoutes } from "../modules/technology/technology.routes.js";
import { publicRouter as socialLinkRoutes } from "../modules/social-links/socialLink.routes.js";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/certificates", certificateRoutes);
router.use("/experiences", experienceRoutes);
router.use("/social-links", socialLinkRoutes);
router.use("/technologies", technologyRoutes);
router.use("/issuers", issuerRoutes);
router.use("/contacts", contactRoutes);
router.use("/profiles", profileRoutes);
router.use("/educations", educationRoutes);

export default router;
