import cors, { CorsOptions } from "cors";
import { environments } from "@src/core/infraestructure/config";
import { NextFunction, Request, Response } from "express";

const whiteList = environments.corsWhitelist.split(',');

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  cors(corsOptions)(req, res, next);
};