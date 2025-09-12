import { ApiResponse } from "@src/core/shared";
import { NextFunction, Request, Response } from "express";

export const validateLogin = (req:Request, res:Response, next:NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(req.body.email)) {
    return res.status(400).json(
      ApiResponse.error('Invalid email or password')
    );
  }

  if(req.body.password.length < 8) {
    return res.status(400).json(
      ApiResponse.error('Invalid email or password')
    );
  }

  next();
};