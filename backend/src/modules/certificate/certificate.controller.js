import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} from "./certificate.service.js";

import {
  createCertificateSchema,
  updateCertificateSchema,
} from "./certificate.validation.js";

export const createCertificateController = asyncHandler(async (req, res) => {
  const data = createCertificateSchema.parse(req.body);

  const certificate = await createCertificate(data);

  return res.status(201).json({
    success: true,
    message: "Certificate created successfully",
    data: certificate,
  });
});

export const getCertificatesController = asyncHandler(async (req, res) => {
  const certificates = await getCertificates();

  return res.status(200).json({
    success: true,
    data: certificates,
  });
});

export const getCertificateByIdController = asyncHandler(async (req, res) => {
  const certificate = await getCertificateById(req.params.id);

  return res.status(200).json({
    success: true,
    data: certificate,
  });
});

export const updateCertificateController = asyncHandler(async (req, res) => {
  const data = updateCertificateSchema.parse(req.body);

  const certificate = await updateCertificate(req.params.id, data);

  return res.status(200).json({
    success: true,
    message: "Certificate updated successfully",
    data: certificate,
  });
});

export const deleteCertificateController = asyncHandler(async (req, res) => {
  await deleteCertificate(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Certificate deleted successfully",
  });
});