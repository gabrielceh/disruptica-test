import { ApiResponse } from "@src/core/shared";
import { Request, Response, NextFunction } from "express";

export function validatePatientId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'id' is required and must be a valid string."));
  }

  next();
}
