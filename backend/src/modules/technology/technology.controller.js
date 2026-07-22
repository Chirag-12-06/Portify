import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createTech,
  getTechs,
  getTechById,
  updateTech,
  deleteTech,
} from "./technology.service.js";

import {
  createTechSchema,
  updateTechSchema,
} from "./technology.validation.js";

export const createTechController = asyncHandler(async (req, res) => {
  const data = createTechSchema.parse(req.body);

  const tech = await createTech(data);

  return res.status(201).json({
    success: true,
    message: "Tech created successfully",
    data: tech,
  });
});

export const getTechsController = asyncHandler(async (req, res) => {
  const techs = await getTechs(req.query.category);

  return res.status(200).json({
    success: true,
    data: techs,
  });
});

export const getTechByIdController = asyncHandler(async (req, res) => {
  const tech = await getTechById(req.params.id);

  return res.status(200).json({
    success: true,
    data: tech,
  });
});

export const updateTechController = asyncHandler(async (req, res) => {
  const data = updateTechSchema.parse(req.body);

  const tech = await updateTech(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Tech updated successfully",
    data: tech,
  });
});

export const deleteTechController = asyncHandler(async (req, res) => {
  await deleteTech(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Tech deleted successfully",
  });
});