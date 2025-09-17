import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - deactivate", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let controller: PatientController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockRepo = {
      deactivate: jest.fn(),
      activate: jest.fn(),
      addConsultation: jest.fn(),
      create: jest.fn(),
      findByName: jest.fn(),
      getActivePatients: jest.fn(),
      update: jest.fn(),
      getPatientById: jest.fn(),
    };
    controller = new PatientController(mockRepo);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ debería desactivar un paciente y devolver ApiResponse.success", async () => {
    mockReq = { params: { id: "p1" } };
    mockRepo.deactivate.mockResolvedValue(true);

    await controller.deactivate(mockReq, mockRes);

    expect(mockRepo.deactivate).toHaveBeenCalledWith("p1");
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success("Patient deactivated"));
  });

  it("❌ debería manejar errores y devolver 400 con ApiResponse.error", async () => {
    mockReq = { params: { id: "p1" } };
    mockRepo.deactivate.mockRejectedValue(new Error("Deactivation failed"));

    await controller.deactivate(mockReq, mockRes);

    expect(mockRepo.deactivate).toHaveBeenCalledWith("p1");
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Deactivation failed"));
  });
});
