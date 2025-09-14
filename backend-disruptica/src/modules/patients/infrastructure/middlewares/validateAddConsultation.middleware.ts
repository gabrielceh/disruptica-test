import { ApiResponse } from "@src/core/shared";
import { Request, Response, NextFunction } from "express";

export function validateAddConsultation(req: Request, res: Response, next: NextFunction) {
  const { id: patientId } = req.params;
  const { date, reason, observations } = req.body;

  if (!patientId || typeof patientId !== "string" || patientId.trim().length === 0) {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'patientId' is required and must be a valid string."));
  }

  if (!date || isNaN(Date.parse(date))) {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'date' is required and must be a valid date."));
  }

  if (!reason || typeof reason !== "string" || reason.trim().length === 0) {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'reason' is required and must be a valid string."));
  }

  if (observations !== undefined && typeof observations !== "string") {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'observations' must be a string if provided."));
  }

  next();
}
