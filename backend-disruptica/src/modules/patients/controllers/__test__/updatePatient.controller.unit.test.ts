import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Patient, Gender } from "@modules/patients/domain/entities";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - update", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let controller: PatientController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockRepo = {
      update: jest.fn(),
      // no usamos los demás métodos, pero los ponemos para evitar errores
      activate: jest.fn(),
      addConsultation: jest.fn(),
      create: jest.fn(),
      deactivate: jest.fn(),
      findByName: jest.fn(),
      getActivePatients: jest.fn(),
      getPatientById: jest.fn(),
    };

    controller = new PatientController(mockRepo);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ debería actualizar un paciente y devolver ApiResponse.success", async () => {
    const updatedPatient = new Patient({
      name: "Ana",
      lastName: "Gómez",
      birthDate: new Date("1990-05-10"),
      gender: Gender.FEMALE,
    });

    mockReq = { body: updatedPatient };
    mockRepo.update.mockResolvedValue(updatedPatient);

    await controller.update(mockReq, mockRes);

    expect(mockRepo.update).toHaveBeenCalledWith(expect.any(Patient));
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success(updatedPatient));
  });

  it("❌ debería manejar errores y devolver 400 con ApiResponse.error", async () => {
    const invalidPatient = { name: "" }; // datos incompletos
    mockReq = { body: invalidPatient };

    mockRepo.update.mockRejectedValue(new Error("Invalid patient data"));

    await controller.update(mockReq, mockRes);

    expect(mockRepo.update).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("Invalid patient data"));
  });
});
