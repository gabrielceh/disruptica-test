import { AddConsultationDTO } from "../../../domain/dto";
import { Consultation } from "../../../domain/entities";
import { PatientRepository } from "../../../domain/repositories";
import { AddConsultationUseCase } from "../AddConsultation.usecase";


describe("AddConsultationUseCase", () => {
  let useCase: AddConsultationUseCase;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockConsultation: Consultation;
  let mockDto: AddConsultationDTO;

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

    useCase = new AddConsultationUseCase(mockRepo);

    mockDto = {
      date: new Date(),
      reason: "Headache",
      observations: "Take ibuprofen",
    };

    mockConsultation = Object.assign(new Consultation({
      id: "c-1",
      date: mockDto.date!,
      reason: mockDto.reason,
      observations: mockDto.observations,
    }));
  });

  it("✅ should add a consultation to a patient", async () => {
    mockRepo.addConsultation.mockResolvedValue(mockConsultation);

    const result = await useCase.execute("p-1", mockDto);

    expect(mockRepo.addConsultation).toHaveBeenCalledWith("p-1", mockDto);
    expect(result).toBe(mockConsultation);
  });

  it("❌ should throw error if repository fails", async () => {
    mockRepo.addConsultation.mockRejectedValue(new Error("Patient not found"));

    await expect(useCase.execute("p-1", mockDto))
      .rejects.toThrow("Patient not found");
  });
});
