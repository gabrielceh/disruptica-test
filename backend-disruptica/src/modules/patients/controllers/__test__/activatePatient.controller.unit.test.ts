import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - activate", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let controller: PatientController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockRepo = {
      activate: jest.fn(),
      deactivate: jest.fn(),
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

  it("✅ debería activar un paciente y devolver ApiResponse.success", async () => {
    mockReq = { params: { id: "p1" } };
    mockRepo.activate.mockResolvedValue(true);

    await controller.activate(mockReq, mockRes);

    expect(mockRepo.activate).toHaveBeenCalledWith("p1");
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success("Patient activated"));
  });

  it("❌ debería manejar errores y devolver 400 con ApiResponse.error", async () => {
    mockReq = { params: { id: "p1" } };
    mockRepo.activate.mockRejectedValue(new Error("Activation failed"));

    await controller.activate(mockReq, mockRes);

    expect(mockRepo.activate).toHaveBeenCalledWith("p1");
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Activation failed"));
  });
});
