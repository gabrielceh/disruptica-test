import { validateUpdatePatient } from "../validateUpdatePatient.middleware";
import { Gender } from "@modules/patients/domain/entities/Gender.enum";

describe("validateUpdatePatient middleware", () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = { body: {}, params: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("✅ should pass with a valid patient", () => {
    mockReq.params = { id: "123" };

    mockReq.body = {
      name: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
      gender: Gender.MALE,
      consultations: [],
      isActive: true,
    };

    validateUpdatePatient(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("❌ should fail if 'id' param is missing", () => {
    mockReq.params = {};

    mockReq.body = {
      name: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
      gender: Gender.MALE,
    };

    validateUpdatePatient(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "The field 'id' is required and must be a string.",
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should fail if 'birthDate' is invalid", () => {
    mockReq.params = { id: "123" };

    mockReq.body = {
      name: "John",
      lastName: "Doe",
      birthDate: "invalid-date",
      gender: Gender.MALE,
    };

    validateUpdatePatient(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "The field 'birthDate' is required and must be a valid date.",
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("❌ should fail if 'gender' is invalid", () => {
    mockReq.params = { id: "123" };

    mockReq.body = {
      name: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
      gender: "INVALID",
    };

    validateUpdatePatient(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: `The field 'gender' is required and must be one of: ${Object.values(Gender).join(", ")}`,
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
