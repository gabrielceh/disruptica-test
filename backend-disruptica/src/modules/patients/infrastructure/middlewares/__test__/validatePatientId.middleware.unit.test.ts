// tests/middlewares/validatePatientIdMiddleware.test.ts
import { Request, Response, NextFunction } from "express";
import { validatePatientId } from "../validatePatientId.middleware";

describe("validatePatientId", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("✅ should call next if id is valid", () => {
    req.params = { id: "patient-123" };

    validatePatientId(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("❌ should return 400 if id is missing", () => {
    req.params = {};

    validatePatientId(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The field 'id' is required and must be a valid string.",
      status: "error",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("❌ should return 400 if 'id' is an empty string or only whitespace", () => {
    req.params = { id: "   " };

    validatePatientId(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The field 'id' is required and must be a valid string.",
      status: "error",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });
});
