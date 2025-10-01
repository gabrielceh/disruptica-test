import { Request, Response } from "express";


import { ApiResponse } from "@src/core/shared";
import { GenerateSeedUseCase } from "../application/usecases";

export class SeedController {
  constructor(private readonly generateUseCase: GenerateSeedUseCase) {}

  async generateSeed(req: Request, res: Response) {
    try {
      const result = await this.generateUseCase.execute();
      if(!result){
        throw new Error("Seed failed");
      }
      res.status(200).json(ApiResponse.success("Seeded successfully"));
    } catch (error: any) {
      res.status(401).json(ApiResponse.error(error?.message));
    }
  }
}