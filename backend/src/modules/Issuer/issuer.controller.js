import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createIssuer,
  getIssuers,
  getIssuerById,
  updateIssuer,
  deleteIssuer,
} from "./issuer.service.js";

import {
  createIssuerSchema,
  updateIssuerSchema,
} from "./issuer.validation.js";

export const createIssuerController = asyncHandler(async (req, res) => {
  const data = createIssuerSchema.parse(req.body);

  const issuer = await createIssuer(data);

  return res.status(201).json({
    success: true,
    message: "Issuer created successfully",
    data: issuer,
  });
});

export const getIssuersController = asyncHandler(async (req, res) => {
  const issuers = await getIssuers();

  return res.status(200).json({
    success: true,
    data: issuers,
  });
});

export const getIssuerByIdController = asyncHandler(async (req, res) => {
  const issuer = await getIssuerById(req.params.id);

  return res.status(200).json({
    success: true,
    data: issuer,
  });
});

export const updateIssuerController = asyncHandler(async (req, res) => {
  const data = updateIssuerSchema.parse(req.body);

  const issuer = await updateIssuer(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Issuer updated successfully",
    data: issuer,
  });
});

export const deleteIssuerController = asyncHandler(async (req, res) => {
  await deleteIssuer(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Issuer deleted successfully",
  });
});