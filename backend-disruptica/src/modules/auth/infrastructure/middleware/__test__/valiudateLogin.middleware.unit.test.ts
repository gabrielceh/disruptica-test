import { validateLogin } from "../validateLogin";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@src/core/shared";

describe("validateLogin middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it("❌ should return 400 if email is missing", () => {
    mockReq.body = { password: "password123" };

    validateLogin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing credentials" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should return 400 if password is missing", () => {
    mockReq.body = { email: "test@example.com" };

    validateLogin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Missing credentials" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should return 400 if email is invalid", () => {
    mockReq.body = { email: "invalid-email", password: "password123" };

    validateLogin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Invalid email or password"));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should return 400 if password is too short", () => {
    mockReq.body = { email: "test@example.com", password: "short" };

    validateLogin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Invalid email or password"));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("✅ should call next if email and password are valid", () => {
    mockReq.body = { email: "test@example.com", password: "password123" };

    validateLogin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
