import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { Consultation, Gender, Patient } from "@modules/patients/domain/entities";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - addConsultation", () => {
  let controller: PatientController;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockPatient: Patient;
  let mockConsultation: Consultation;

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

    mockConsultation = Object.assign(new Consultation({
      id: "c-1",
      date: new Date(),
      reason: "Flu",
      observations: "Rest for 5 days",
    }));
  });

  it("✅ should add consultation successfully", async () => {
    const req: any = { params: { id: "p-1" }, body: mockConsultation };
    const res = mockRes();
    mockRepo.addConsultation.mockResolvedValue(mockConsultation);

    await controller.addConsultation(req, res);

    expect(mockRepo.addConsultation).toHaveBeenCalledWith("p-1", mockConsultation);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(ApiResponse.success(mockConsultation));
  });

  it("❌ should return 400 on error", async () => {
    const req: any = { params: { id: "p-1" }, body: mockConsultation };
    const res = mockRes();
    mockRepo.addConsultation.mockRejectedValue(new Error("Add consultation failed"));

    await controller.addConsultation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(ApiResponse.error("Add consultation failed"));
  });
});
