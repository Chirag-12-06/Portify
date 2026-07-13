import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "./experience.service.js";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "./experience.validation.js";

export const createExperienceController = asyncHandler(async (req, res) => {
  const data = createExperienceSchema.parse(req.body);

  const experience = await createExperience(data);

  return res.status(201).json({
    success: true,
    message: "Experience created successfully",
    data: experience,
  });
});

export const getExperiencesController = asyncHandler(async (req, res) => {
  const experiences = await getExperiences();

  return res.status(200).json({
    success: true,
    data: experiences,
  });
});

export const getExperienceByIdController = asyncHandler(async (req, res) => {
  const experience = await getExperienceById(req.params.id);

  return res.status(200).json({
    success: true,
    data: experience,
  });
});

export const updateExperienceController = asyncHandler(async (req, res) => {
  const data = updateExperienceSchema.parse(req.body);

  const experience = await updateExperience(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Experience updated successfully",
    data: experience,
  });
});

export const deleteExperienceController = asyncHandler(async (req, res) => {
  await deleteExperience(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Experience deleted successfully",
  });
});