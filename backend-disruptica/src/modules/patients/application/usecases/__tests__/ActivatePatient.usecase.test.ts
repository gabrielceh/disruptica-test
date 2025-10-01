import { ActivatePatientUseCase } from "../ActivatePatient.usecase";
import { PatientRepository } from "../../../domain/repositories";


describe("ActivatePatientUseCase", () => {
  let useCase: ActivatePatientUseCase;
  let mockRepo: jest.Mocked<PatientRepository>;

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
    useCase = new ActivatePatientUseCase(mockRepo);
  });

  it("✅ should activate a patient successfully", async () => {
    mockRepo.activate.mockResolvedValue(true);

    const result = await useCase.execute("p-1");

    expect(mockRepo.activate).toHaveBeenCalledWith("p-1");
    expect(result).toBe(true);
  });

  it("❌ should return false if activation fails", async () => {
    mockRepo.activate.mockResolvedValue(false);

    const result = await useCase.execute("p-2");

    expect(mockRepo.activate).toHaveBeenCalledWith("p-2");
    expect(result).toBe(false);
  });
});
