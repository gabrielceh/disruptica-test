import { PatientController } from "../Patient.controller";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { ApiResponse } from "@src/core/shared";

describe("PatientController - activate", () => {
  let controller: PatientController;
  let mockRepo: jest.Mocked<PatientRepository>;

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
  });

  it("✅ should activate a patient successfully", async () => {
    const req: any = { params: { id: "p-1" } };
    const res = mockRes();
    mockRepo.activate.mockResolvedValue(true);

    await controller.activate(req, res);

    expect(mockRepo.activate).toHaveBeenCalledWith("p-1");
    expect(res.json).toHaveBeenCalledWith(
      ApiResponse.success("Patient with id p-1 was activated")
    );
  });

  it("❌ should return 400 if patient not found", async () => {
    const req: any = { params: { id: "p-2" } };
    const res = mockRes();
    mockRepo.activate.mockResolvedValue(false);

    await controller.activate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      ApiResponse.error("Patient with id p-2 not found")
    );
  });

  it("❌ should return 400 on error", async () => {
    const req: any = { params: { id: "p-3" } };
    const res = mockRes();
    mockRepo.activate.mockRejectedValue(new Error("DB Error"));

    await controller.activate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(ApiResponse.error("DB Error"));
  });
});
