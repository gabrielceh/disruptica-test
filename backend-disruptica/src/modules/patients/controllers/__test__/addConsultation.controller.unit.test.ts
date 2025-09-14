import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Consultation } from "@modules/patients/domain/entities";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - addConsultation", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let controller: PatientController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockRepo = {
      addConsultation: jest.fn(),
      activate: jest.fn(),
      create: jest.fn(),
      deactivate: jest.fn(),
      findByName: jest.fn(),
      getActivePatients: jest.fn(),
      update: jest.fn(),
    };

    controller = new PatientController(mockRepo);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ debería añadir una consulta y devolver ApiResponse.success con status 201", async () => {
    const consultation: Consultation = {
      id: "c1",
      date: new Date("2025-01-01"),
      reason: "Dolor de cabeza",
      observations: "Revisar presión arterial",
    };

    mockReq = {
      params: { id: "p1" },
      body: consultation,
    };

    mockRepo.addConsultation.mockResolvedValue(consultation);

    await controller.addConsultation(mockReq, mockRes);

    expect(mockRepo.addConsultation).toHaveBeenCalledWith("p1", consultation);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success(consultation));
  });

  it("❌ debería manejar errores y devolver 400 con ApiResponse.error", async () => {
    const consultation = { reason: "Sin fecha" }; // consulta inválida

    mockReq = {
      params: { id: "p1" },
      body: consultation,
    };

    mockRepo.addConsultation.mockRejectedValue(new Error("Invalid consultation data"));

    await controller.addConsultation(mockReq, mockRes);

    expect(mockRepo.addConsultation).toHaveBeenCalledWith("p1", consultation);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Invalid consultation data"));
  });
});
