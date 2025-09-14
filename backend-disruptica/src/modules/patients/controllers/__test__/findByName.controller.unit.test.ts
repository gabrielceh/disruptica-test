import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Patient } from "@modules/patients/domain/entities";
import { Gender } from "@modules/patients/domain/entities/Gender.enum";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - findByName", () => {
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
    };

    controller = new PatientController(mockRepo);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("✅ debería devolver los pacientes encontrados con ApiResponse.success", async () => {
    const patients = [
      new Patient({
        name: "Ana",
        lastName: "Lopez",
        birthDate: new Date("1990-05-05"),
        gender: Gender.FEMALE,
      }),
    ];

    mockRepo.findByName.mockResolvedValue(patients);

    const mockReq: any = { params: { name: "Ana" } };

    await controller.findByName(mockReq, mockRes);

    expect(mockRepo.findByName).toHaveBeenCalledWith("Ana");
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.success(patients));
  });

  it("❌ debería manejar errores y devolver 500 con ApiResponse.error", async () => {
    mockRepo.findByName.mockRejectedValue(new Error("DB query failed"));

    const mockReq: any = { params: { name: "Ana" } };

    await controller.findByName(mockReq, mockRes);

    expect(mockRepo.findByName).toHaveBeenCalledWith("Ana");
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(ApiResponse.error("DB query failed"));
  });
});
