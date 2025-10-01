import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Gender, Patient } from "@modules/patients/domain/entities";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - getPatientById", () => {
  let controller: PatientController;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockPatient: Patient;

  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    mockRepo = {
      activate: jest.fn(),
      deactivate: jest.fn(),
      getActivePatients: jest.fn(),
      getPatientById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      addConsultation: jest.fn(),
    };
    controller = new PatientController(mockRepo);
    mockPatient = Object.assign(new Patient({
      id: "p-1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      gender: Gender.MALE,
      consultations: [],
    }));
  });

  it("✅ should return patient by id successfully", async () => {
    const req: any = { params: { id: "p-1" } };
    const res = mockRes();
    mockRepo.getPatientById.mockResolvedValue(mockPatient);

    await controller.getPatientById(req, res);

    expect(mockRepo.getPatientById).toHaveBeenCalledWith("p-1");
    expect(res.json).toHaveBeenCalledWith(ApiResponse.success(mockPatient));
  });

  it("❌ should return 400 on error", async () => {
    const req: any = { params: { id: "p-2" } };
    const res = mockRes();
    mockRepo.getPatientById.mockRejectedValue(new Error("DB Error"));

    await controller.getPatientById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(ApiResponse.error("DB Error"));
  });
});
