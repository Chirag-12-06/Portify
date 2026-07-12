import { Router } from "express";

import { loginAdmin } from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", loginAdmin);

router.get("/me", authenticate, (req, res) => {
  res.json(req.user);
});

export default router;