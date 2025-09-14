// src/modules/patients/infrastructure/middlewares/validateUpdatePatient.ts
import { Request, Response, NextFunction } from "express";
import { Gender } from "@modules/patients/domain/entities/Gender.enum";
import { ApiResponse } from "@src/core/shared";

export const validateUpdatePatient = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, lastName, birthDate, gender, consultations, isActive } = req.body;

  // Validate required fields
  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'id' is required and must be a string."));
  }

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'name' is required and must be a string."));
  }

  if (!lastName || typeof lastName !== "string") {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'lastName' is required and must be a string."));
  }

  if (!birthDate || isNaN(Date.parse(birthDate))) {
    return res
      .status(400)
      .json(ApiResponse.error("The field 'birthDate' is required and must be a valid date."));
  }

  if (!gender || !Object.values(Gender).includes(gender)) {
    return res
      .status(400)
      .json(
        ApiResponse.error(
          `The field 'gender' is required and must be one of: ${Object.values(
            Gender
          ).join(", ")}`
        )
      );
  }

  next();
};
