import { DeactivatePatientUseCase } from "../DeactivatePatient.usecase";
import { PatientRepository } from "../../../domain/repositories";


describe("DeactivatePatientUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: DeactivatePatientUseCase;

  beforeEach(() => {
    mockRepo = {
      activate: jest.fn(),
      deactivate: jest.fn(),
      addConsultation: jest.fn(),
      create: jest.fn(),
      findByName: jest.fn(),
      getActivePatients: jest.fn(),
      update: jest.fn(),
      getPatientById: jest.fn(),
    };
    usecase = new DeactivatePatientUseCase(mockRepo);
  });

  it("should deactivate a patient", async () => {
    mockRepo.deactivate.mockResolvedValue(true);

    const result = await usecase.execute("p1");

    expect(result).toBe(true);
    expect(mockRepo.deactivate).toHaveBeenCalledWith("p1");
  });
});
