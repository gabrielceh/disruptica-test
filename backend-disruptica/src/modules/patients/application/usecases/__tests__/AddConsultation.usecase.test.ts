import { PatientRepository } from "../../../domain/repositories";
import { AddConsultationUseCase } from "../AddConsultation.usecase";


describe("AddConsultationUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: AddConsultationUseCase;

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
    usecase = new AddConsultationUseCase(mockRepo);
  });

  it("should add a consultation", async () => {
    const consultation = {
      id: "c1",
      date: new Date(),
      reason: "Dolor de cabeza",
      observations: "Tomar ibuprofeno",
    };

    mockRepo.addConsultation.mockResolvedValue(consultation);

    const result = await usecase.execute("p1", consultation);

    expect(result).toEqual(consultation);
    expect(mockRepo.addConsultation).toHaveBeenCalledWith("p1", consultation);
  });
});
