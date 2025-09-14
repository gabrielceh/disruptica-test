
import { ApiResponse } from "@src/core/shared";
import { Request, Response, NextFunction } from "express";

export function validateFindByName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.params;

  if (typeof name !== "string") {
    return res
      .status(400)
      .json(ApiResponse.error("The parameter 'name' is required and must be a string."));
  }

  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return res
      .status(400)
      .json(ApiResponse.error("The parameter 'name' cannot be empty or only whitespace."));
  }

  // Ensure it contains at least one letter
  const regex = /[a-zA-Z]/;
  if (!regex.test(trimmed)) {
    return res
      .status(400)
      .json(ApiResponse.error("The parameter 'name' must contain at least one letter."));
  }

  next();
}
