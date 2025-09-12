import jwt, { SignOptions } from "jsonwebtoken";
import { environments } from "@src/core/infraestructure/config";


export interface JwtPayload {
  userId: string;
  email: string;
  role: string
}

export const generateToken = (payload: JwtPayload) => {
  const options: SignOptions = {
    expiresIn:  "7d",
  }

  return jwt.sign(payload, environments.jwtSecretKey as jwt.Secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, environments.jwtSecretKey) as JwtPayload;
};


