
import { ApiResponse } from "@src/core/shared";
import { GenerateSeedUseCase } from "../../application/usecases";
import { SeedController } from "../Seed.controller";

describe("SeedController - generateSeed", () => {
  let controller: SeedController;
  let mockUseCase: GenerateSeedUseCase;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockUseCase = {
      execute: jest.fn(),
    } as unknown as GenerateSeedUseCase;

    controller = new SeedController(mockUseCase);

    mockReq = {};

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ should return success response when use case succeeds", async () => {
    (mockUseCase.execute as jest.Mock).mockResolvedValue({ message: "Seeded successfully" });

    await controller.generateSeed(mockReq, mockRes);

    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success("Seeded successfully"));
  });

  it("❌ should return error response when use case returns falsy", async () => {
    (mockUseCase.execute as jest.Mock).mockResolvedValue(null);

    await controller.generateSeed(mockReq, mockRes);

    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Seed failed"));
  });

  it("❌ should return error response when use case throws", async () => {
    (mockUseCase.execute as jest.Mock).mockRejectedValue(new Error("Some error"));

    await controller.generateSeed(mockReq, mockRes);

    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Some error"));
  });
});
