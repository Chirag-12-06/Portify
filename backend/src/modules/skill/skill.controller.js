import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "./skill.service.js";

import {
  createSkillSchema,
  updateSkillSchema,
} from "./skill.validation.js";

export const createSkillController = asyncHandler(async (req, res) => {
  const data = createSkillSchema.parse(req.body);

  const skill = await createSkill(data);

  return res.status(201).json({
    success: true,
    message: "Skill created successfully",
    data: skill,
  });
});

export const getSkillsController = asyncHandler(async (req, res) => {
  const skills = await getSkills(req.query.category);

  return res.status(200).json({
    success: true,
    data: skills,
  });
});

export const getSkillByIdController = asyncHandler(async (req, res) => {
  const skill = await getSkillById(req.params.id);

  return res.status(200).json({
    success: true,
    data: skill,
  });
});

export const updateSkillController = asyncHandler(async (req, res) => {
  const data = updateSkillSchema.parse(req.body);

  const skill = await updateSkill(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: skill,
  });
});

export const deleteSkillController = asyncHandler(async (req, res) => {
  await deleteSkill(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
});