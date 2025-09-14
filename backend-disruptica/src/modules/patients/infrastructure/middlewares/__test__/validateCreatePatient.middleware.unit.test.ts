import { validateCreatePatient } from "../validateCreatePatient.middleware";
import { Gender } from "../../../domain/entities/Gender.enum";

describe("validateCreatePatient middleware", () => {
  const mockReq: any = { body: {}, params: {} };
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("❌ should reject if 'name' is missing", () => {
    mockReq.params = { id: "123" };
    mockReq.body = { lastName: "Doe", birthDate: "2000-01-01", gender: Gender.MALE };

    validateCreatePatient(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "The field 'name' is required and must be a string.",
      status: "error",
      data: null,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("✅ should call next() if data is valid", () => {
    mockReq.params = { id: "123" };
    mockReq.body = {
      name: "John",
      lastName: "Doe",
      birthDate: "2000-01-01",
      gender: Gender.MALE
    };

    validateCreatePatient(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
