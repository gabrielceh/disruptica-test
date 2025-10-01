import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Gender, Patient } from "@modules/patients/domain/entities";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - update", () => {
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

  it("✅ should update the patient successfully", async () => {
    const req: any = { body: { ...mockPatient } };
    const res = mockRes();
    mockRepo.update.mockResolvedValue(mockPatient);

    await controller.update(req, res);

    expect(mockRepo.update).toHaveBeenCalledWith(expect.any(Patient));
    expect(res.json).toHaveBeenCalledWith(ApiResponse.success(mockPatient));
  });

  it("❌ should return 400 on error", async () => {
    const req: any = { body: { ...mockPatient } };
    const res = mockRes();
    mockRepo.update.mockRejectedValue(new Error("Update failed"));

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(ApiResponse.error("Update failed"));
  });
});
