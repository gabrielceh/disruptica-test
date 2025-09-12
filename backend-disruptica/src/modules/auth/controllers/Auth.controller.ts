import { Request, Response } from "express";

import { LoginUseCase } from "@modules/auth/application/usecases";
import { ApiResponse } from "@src/core/shared";
import { generateToken } from "@src/core/shared/utils";

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.loginUseCase.execute(email, password);

      if(!user) {
        throw new Error("Email or password incorrect");
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      const response = ApiResponse.success({
        token,
        user:{
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }}
    );
      res.status(200).json(response);
    } catch (error:any) {

      res.status(401).json(ApiResponse.error(error?.message));
    }

  }

}