import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@core/shared/utils";
import { ApiResponse } from "../ResponseHandler";
import { AppDataSource } from "@src/core/infraestructure/config/datasource";
import { User } from "@src/modules/auth/domain/entities";

export const validateUser = async(req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const usersDataSource = AppDataSource.getRepository(User);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(ApiResponse.error("Missing or invalid token"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const user = await usersDataSource.findOne({where: { id: userId }});

    if (!user) {
      return res.status(401).json(ApiResponse.error("Invalid user"));
    }

    next();
  } catch (err: any) {
    return res.status(401).json(ApiResponse.error("Token invalid or expired"));
  }
};
