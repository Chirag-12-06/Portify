import { asyncHandler } from "../../../utils/asyncHandler.js";
import { getLeetCodeStats } from "./leetcode.service.js";

export const getLeetCodeStatsController = asyncHandler(async (req, res) => {
  const data = await getLeetCodeStats();

  res.status(200).json(data);
});
