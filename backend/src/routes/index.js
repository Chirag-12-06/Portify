import { Router } from "express";
import adminRoutes from "./admin.js";
import publicRoutes from "./public.js";
const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

router.use("/admin", adminRoutes);
router.use("/public", publicRoutes);

export default router;
