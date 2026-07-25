import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  getAbout,
  updateAbout,
} from "./about.service.js";

import { updateAboutSchema } from "./about.validation.js";

export const getAboutController = asyncHandler(async (req, res) => {
  const about = await getAbout();

  return res.status(200).json({
    success: true,
    data: about,
  });
});

export const updateAboutController = asyncHandler(async (req, res) => {
  const data = updateAboutSchema.parse(req.body);

  const about = await updateAbout(data);

  return res.status(200).json({
    success: true,
    message: "About updated successfully",
    data: about,
  });
});