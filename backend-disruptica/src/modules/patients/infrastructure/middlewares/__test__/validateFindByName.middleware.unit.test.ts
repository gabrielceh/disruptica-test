import { validateFindByName } from "../validateFindByName.middleware";
import { Request, Response, NextFunction } from "express";

describe("validateFindByName Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = { params: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("❌ should fail if parameter is missing", () => {
    mockReq.params = {};

    validateFindByName(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "The parameter 'name' is required and must be a string.",
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should fail if only whitespace", () => {
    mockReq.params = { name: "    " };

    validateFindByName(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "The parameter 'name' cannot be empty or only whitespace.",
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should fail if contains no letters", () => {
    mockReq.params = { name: "12345" };

    validateFindByName(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "The parameter 'name' must contain at least one letter.",
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("✅ should pass with a valid string", () => {
    mockReq.params = { name: "Ana" };

    validateFindByName(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
