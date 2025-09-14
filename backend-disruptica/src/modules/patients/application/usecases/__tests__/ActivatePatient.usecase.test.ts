import { PatientRepository } from "@src/modules/patients/domain/repositories";
import { ActivatePatientUseCase } from "../ActivatePatient.usecase";


describe("ActivatePatientUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: ActivatePatientUseCase;

  beforeEach(() => {
    mockRepo = {
      activate: jest.fn(),
      deactivate: jest.fn(),
      addConsultation: jest.fn(),
      create: jest.fn(),
      findByName: jest.fn(),
      getActivePatients: jest.fn(),
      update: jest.fn(),
    };
    usecase = new ActivatePatientUseCase(mockRepo);
  });

  it("should activate a patient", async () => {
    mockRepo.activate.mockResolvedValue(true);

    const result = await usecase.execute("p1");

    expect(result).toBe(true);
    expect(mockRepo.activate).toHaveBeenCalledWith("p1");
  });
});
