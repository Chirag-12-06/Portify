import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  getProfile,
  updateProfile,
} from "./profile.service.js";

import { updateProfileSchema } from "./profile.validation.js";

export const getProfileController = asyncHandler(async (req, res) => {
  const profile = await getProfile();

  return res.status(200).json({
    success: true,
    data: profile,
  });
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const data = updateProfileSchema.parse(req.body);

  const profile = await updateProfile(data);

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: profile,
  });
});