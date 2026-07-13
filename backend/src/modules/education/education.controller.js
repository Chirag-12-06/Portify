import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
} from "./education.service.js";

import {
  createEducationSchema,
  updateEducationSchema,
} from "./education.validation.js";

export const createEducationController = asyncHandler(async (req, res) => {
  const data = createEducationSchema.parse(req.body);

  const education = await createEducation(data);

  return res.status(201).json({
    success: true,
    message: "education created successfully",
    data: education,
  });
});

export const getEducationsController = asyncHandler(async (req, res) => {
  const educations = await getEducations(req.query.category);

  return res.status(200).json({
    success: true,
    data: educations,
  });
});

export const getEducationByIdController = asyncHandler(async (req, res) => {
  const education = await getEducationById(req.params.id);

  return res.status(200).json({
    success: true,
    data: education,
  });
});

export const updateEducationController = asyncHandler(async (req, res) => {
  const data = updateEducationSchema.parse(req.body);

  const education = await updateEducation(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "education updated successfully",
    data: education,
  });
});

export const deleteEducationController = asyncHandler(async (req, res) => {
  await deleteEducation(req.params.id);

  return res.status(200).json({
    success: true,
    message: "education deleted successfully",
  });
});