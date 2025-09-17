import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Patient } from "@modules/patients/domain/entities";
import { Gender } from "@modules/patients/domain/entities/Gender.enum";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - create", () => {
  let controller: PatientController;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockRes: any;

  beforeEach(() => {
    // Mock del repositorio
    mockRepo = {
      create: jest.fn(),
      getActivePatients: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
      activate: jest.fn(),
      deactivate: jest.fn(),
      addConsultation: jest.fn(),
      getPatientById: jest.fn(),
    };

    controller = new PatientController(mockRepo);

    // Mock del objeto Response de Express
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ debería crear un paciente y retornar 201 con ApiResponse.success", async () => {
    const patientData = {
      name: "Gabriel",
      lastName: "Cervantes",
      birthDate: new Date("1995-01-01"),
      gender: Gender.MALE,
    };

    const patient = new Patient(patientData);
    mockRepo.create.mockResolvedValue(patient);

    const mockReq: any = { body: patientData };

    await controller.create(mockReq, mockRes);

    expect(mockRepo.create).toHaveBeenCalledWith(expect.any(Patient));
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success(patient));
  });

  it("❌ debería manejar errores y retornar 400 con ApiResponse.error", async () => {
    const patientData = {
      name: "Gabriel",
      lastName: "Cervantes",
      birthDate: new Date("1995-01-01"),
      gender: Gender.MALE,
    };

    mockRepo.create.mockRejectedValue(new Error("DB error"));

    const mockReq: any = { body: patientData };

    await controller.create(mockReq, mockRes);

    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("DB error"));
  });
});
