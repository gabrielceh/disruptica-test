import { PatientRepository } from "../../../domain/repositories";
import { DeactivatePatientUseCase } from "../DeactivatePatient.usecase";

describe("DeactivatePatientUseCase", () => {
  let useCase: DeactivatePatientUseCase;
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

    useCase = new DeactivatePatientUseCase(mockRepo);
  });

  it("✅ should deactivate a patient successfully", async () => {
    mockRepo.deactivate.mockResolvedValue(true);

    const result = await useCase.execute("p-1");

    expect(mockRepo.deactivate).toHaveBeenCalledWith("p-1");
    expect(result).toBe(true);
  });

  it("❌ should return false if deactivation fails", async () => {
    mockRepo.deactivate.mockResolvedValue(false);

    const result = await useCase.execute("p-2");

    expect(mockRepo.deactivate).toHaveBeenCalledWith("p-2");
    expect(result).toBe(false);
  });
});
