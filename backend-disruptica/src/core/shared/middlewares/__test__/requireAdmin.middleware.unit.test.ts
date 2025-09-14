import { requireAdmin } from "../requireAdmin.middleware";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "@src/core/shared";

jest.mock("jsonwebtoken");

describe("Middleware - requireAdmin", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { headers: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("✅ debería llamar next() si el rol es admin", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ role: "admin" });
    mockReq.headers = { authorization: "Bearer validtoken" };

    requireAdmin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("❌ debería devolver 401 si no se pasa el token", () => {
    requireAdmin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("No token provided"));
  });

  it("❌ debería devolver 403 si el rol no es admin", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ role: "user" });
    mockReq.headers = { authorization: "Bearer token" };

    requireAdmin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Forbidden: Admins only"));
  });

  it("❌ debería devolver 401 si el token es inválido", () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("invalid token");
    });
    mockReq.headers = { authorization: "Bearer badtoken" };

    requireAdmin(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Invalid token"));
  });
});
