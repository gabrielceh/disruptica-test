import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Gender, Patient } from "@modules/patients/domain/entities";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - findByName", () => {
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

  it("✅ should return patients with the given name", async () => {
    const req: any = { params: { name: "John" } };
    const res = mockRes();
    mockRepo.findByName.mockResolvedValue([mockPatient]);

    await controller.findByName(req, res);

    expect(mockRepo.findByName).toHaveBeenCalledWith("John");
    expect(res.json).toHaveBeenCalledWith(ApiResponse.success([mockPatient]));
  });

  it("❌ should return 500 on error", async () => {
    const req: any = { params: { name: "John" } };
    const res = mockRes();
    mockRepo.findByName.mockRejectedValue(new Error("DB Error"));

    await controller.findByName(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(ApiResponse.error("DB Error"));
  });
});
