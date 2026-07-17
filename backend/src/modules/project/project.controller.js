import {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "./project.service.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "./project.validation.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

export const createProjectController = asyncHandler(async (req, res) => {
  const data = createProjectSchema.parse(req.body);

  const project = await createProject(data);

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

export const getProjectsController = asyncHandler(async (req, res) => {
  console.log("Controller started");

const projects = await getProjects();

console.log("Projects fetched");

  return res.status(200).json({
    success: true,
    data: projects,
  });
});

export const getProjectBySlugController = asyncHandler(async (req, res) => {
  const project = await getProjectBySlug(req.params.slug);

  return res.status(200).json({
    success: true,
    data: project,
  });
});

export const updateProjectController = asyncHandler(async (req, res) => {
  const data = updateProjectSchema.parse(req.body);

  const project = await updateProject(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

export const deleteProjectController = asyncHandler(async (req, res) => {
  await deleteProject(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

export const getProjectByIdController = asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id);

  return res.status(200).json({
    success: true,
    data: project,
  });
});

