import { asyncHandler } from "../../../utils/asyncHandler.js";
import { getGithubStats } from "./github.service.js";

export const getGithubStatsController = asyncHandler(async (req, res) => {
  const data = await getGithubStats();

  res.status(200).json(data);
});
