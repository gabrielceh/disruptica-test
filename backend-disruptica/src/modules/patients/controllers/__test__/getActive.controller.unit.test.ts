import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Patient } from "@modules/patients/domain/entities";
import { Gender } from "@modules/patients/domain/entities/Gender.enum";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - getActive", () => {
  let controller: PatientController;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockRes: any;

  beforeEach(() => {
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

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ debería devolver los pacientes activos con ApiResponse.success", async () => {
    const patients = [
      new Patient({
        name: "Ana",
        lastName: "Lopez",
        birthDate: new Date("1990-05-05"),
        gender: Gender.FEMALE,
      }),
      new Patient({
        name: "Juan",
        lastName: "Perez",
        birthDate: new Date("1985-02-10"),
        gender: Gender.MALE,
      }),
    ];

    mockRepo.getActivePatients.mockResolvedValue(patients);

    const mockReq: any = {};

    await controller.getActive(mockReq, mockRes);

    expect(mockRepo.getActivePatients).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success(patients));
  });

  it("❌ debería manejar errores y devolver 500 con ApiResponse.error", async () => {
    mockRepo.getActivePatients.mockRejectedValue(new Error("DB connection error"));

    const mockReq: any = {};

    await controller.getActive(mockReq, mockRes);

    expect(mockRepo.getActivePatients).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("DB connection error"));
  });
});
