import { ZodError } from "zod";
import { ApiError } from "../utils/apiError.js";
import { Prisma } from "@prisma/client";

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten(),
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
  if (err.meta?.target?.includes("slug")) {
    return res.status(409).json({
      success: false,
      message: "Project slug already exists.",
    });
  }

  return res.status(409).json({
    success: false,
    message: "Duplicate value.",
  });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Record not found.",
        });

      case "P2003":
        return res.status(400).json({
          success: false,
          message: "Invalid reference provided.",
        });

      default:
        return res.status(400).json({
          success: false,
          message: "Database operation failed.",
        });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}