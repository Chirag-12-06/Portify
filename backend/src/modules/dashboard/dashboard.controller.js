import { asyncHandler } from "../../utils/asyncHandler.js";
import { getDashboardStats } from "./dashboard.service.js";

export const getDashboardController = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats();

  return res.status(200).json({
    success: true,
    data: stats,
  });
});