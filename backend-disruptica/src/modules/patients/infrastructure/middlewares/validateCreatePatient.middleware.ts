import { Request, Response, NextFunction } from "express";
import { Gender } from "../../domain/entities/Gender.enum";
import { ApiResponse } from "@src/core/shared";

export const validateCreatePatient = (req: Request, res: Response, next: NextFunction) => {
    const { name, lastName, birthDate, gender } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json(
        ApiResponse.error("The field 'name' is required and must be a string.")
      );
  }

  if (!lastName || typeof lastName !== "string" || lastName.trim() === "") {
    return res
      .status(400)
      .json(
        ApiResponse.error("The field 'lastName' is required and must be a string.")
      );
  }

  if (!birthDate || isNaN(Date.parse(birthDate))) {
    return res
      .status(400)
      .json(
        ApiResponse.error("The field 'birthDate' is required and must be a valid date.")
      );
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
