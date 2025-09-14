import { AuthController } from "../Auth.controller";
import { LoginUseCase } from "@modules/auth/application/usecases";
import { User } from "@modules/auth/domain/entities";
import { ApiResponse } from "@src/core/shared";
import {generateToken} from "@src/core/shared/utils"; 

jest.mock("@src/core/shared/utils", () => ({
  generateToken: jest.fn(() => "mocked-jwt-token")
}));

describe("AuthController - login", () => {
  let mockUseCase: jest.Mocked<LoginUseCase>;
  let controller: AuthController;
  let mockReq: any;
  let mockRes: any;

  const testUser: User = new User(
    "1",
    "test@example.com",
    "password123",
    "Test User",
    "admin"
  );

  beforeEach(() => {
    mockUseCase = { execute: jest.fn() } as unknown as jest.Mocked<LoginUseCase>;
    controller = new AuthController(mockUseCase);

    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

it("✅ should return token and user when login is successful", async () => {
    mockReq.body = { email: testUser.email, password: testUser.password };
    mockUseCase.execute.mockResolvedValue(testUser);

    await controller.login(mockReq, mockRes);

    expect(mockUseCase.execute).toHaveBeenCalledWith(testUser.email, testUser.password);
    expect(generateToken).toHaveBeenCalledWith({
      userId: testUser.id,
      email: testUser.email,
      role: testUser.role
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      ApiResponse.success({
        token: "mocked-jwt-token",
        user: {
          id: testUser.id,
          email: testUser.email,
          name: testUser.name,
          role: testUser.role
        }
      })
    );
  });

  it("❌ should return 401 if login fails", async () => {
    mockReq.body = { email: "wrong@example.com", password: "wrongpass" };
    mockUseCase.execute.mockResolvedValue(null);

    await controller.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Email or password incorrect"));
  });

  it("❌ should return 401 if use case throws an error", async () => {
    mockReq.body = { email: testUser.email, password: testUser.password };
    mockUseCase.execute.mockRejectedValue(new Error("DB error"));

    await controller.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("DB error"));
  });
});
