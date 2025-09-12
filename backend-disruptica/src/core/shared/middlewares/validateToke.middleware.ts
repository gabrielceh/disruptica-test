// src/core/shared/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@core/shared/utils";
import { ApiResponse } from "../ResponseHandler";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(ApiResponse.error("Missing or invalid token"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    (req as any).user = decoded;
    next();
  } catch (err: any) {
    return res.status(401).json(ApiResponse.error("Token invalid or expired"));
  }
};
