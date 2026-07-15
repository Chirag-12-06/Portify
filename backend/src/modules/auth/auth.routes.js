import { Router } from "express";

import { loginAdmin, logoutAdmin } from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", loginAdmin);

router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.post("/logout", logoutAdmin);

export default router;