import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createSocialLink,
  getSocialLinks,
  getSocialLinkById,
  updateSocialLink,
  deleteSocialLink,
} from "./socialLink.service.js";

import {
  createSocialLinkSchema,
  updateSocialLinkSchema,
} from "./socialLink.validation.js";

export const createSocialLinkController = asyncHandler(async (req, res) => {
  const data = createSocialLinkSchema.parse(req.body);

  const socialLink = await createSocialLink(data);

  return res.status(201).json({
    success: true,
    message: "Social link created successfully",
    data: socialLink,
  });
});

export const getSocialLinksController = asyncHandler(async (req, res) => {
  const socialLinks = await getSocialLinks();

  return res.status(200).json({
    success: true,
    data: socialLinks,
  });
});

export const getSocialLinkByIdController = asyncHandler(async (req, res) => {
  const socialLink = await getSocialLinkById(req.params.id);

  return res.status(200).json({
    success: true,
    data: socialLink,
  });
});

export const updateSocialLinkController = asyncHandler(async (req, res) => {
  const data = updateSocialLinkSchema.parse(req.body);

  const socialLink = await updateSocialLink(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Social link updated successfully",
    data: socialLink,
  });
});

export const deleteSocialLinkController = asyncHandler(async (req, res) => {
  await deleteSocialLink(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Social link deleted successfully",
  });
});