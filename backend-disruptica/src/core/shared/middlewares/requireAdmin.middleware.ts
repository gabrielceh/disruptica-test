import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@src/core/shared";
import { verifyToken } from '@core/shared/utils/jwt';

export  const requireAdmin = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(ApiResponse.error("No token provided"));
    }
    
    const token = authHeader.split(" ")[1];
    const decoded =  verifyToken(token)

    if (decoded.role !== "admin") {
      return res.status(403).json(ApiResponse.error("Forbidden: Admins only"));
    }

    next();
  } catch (error: any) {
    return res.status(401).json(ApiResponse.error("Invalid token"));
  }
};
