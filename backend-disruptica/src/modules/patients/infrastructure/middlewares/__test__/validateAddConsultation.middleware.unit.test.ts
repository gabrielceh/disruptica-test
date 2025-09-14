import { validateAddConsultation } from "../validateAddConsultation.middleware";
import { Request, Response, NextFunction } from "express";

describe("validateAddConsultation Middleware", () => {
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

  it("✅ should call next() if data is valid", () => {
    req.params = { id: "123" };
    req.body = {
      patientId: "123",
      date: "2024-09-10",
      reason: "Headache",
      observations: "Patient with a history of migraines",
    };

    validateAddConsultation(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("❌ should return error if patientId is missing", () => {
    req.body = { date: "2024-09-10", reason: "Headache" };

    validateAddConsultation(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The field 'patientId' is required and must be a valid string.",
      status: "error",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("❌ should return error if date is invalid", () => {
    req.params = { id: "123" };
    req.body = { date: "invalid-date", reason: "Headache" };

    validateAddConsultation(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The field 'date' is required and must be a valid date.",
      status: "error",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("❌ should return error if reason is missing", () => {
    req.params = { id: "123" };
    req.body = { date: "2024-09-10" };

    validateAddConsultation(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The field 'reason' is required and must be a valid string.",
      status: "error",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("❌ should return error if observations is not a string", () => {
    req.params = { id: "123" };
    req.body = {
      date: "2024-09-10",
      reason: "Headache",
      observations: 1234,
    };

    validateAddConsultation(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "The field 'observations' must be a string if provided.",
      status: "error",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });
});
