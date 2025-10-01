import { Gender, Patient } from "../../../domain/entities";
import { PatientRepository } from "../../../domain/repositories";
import { UpdatePatientUseCase } from "../UpdatePatient.usecase";

describe("UpdatePatientUseCase", () => {
  let useCase: UpdatePatientUseCase;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockPatient: Patient;

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

    useCase = new UpdatePatientUseCase(mockRepo);

    mockPatient = Object.assign(new Patient({
      id: "p-1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      gender: Gender.MALE,
      consultations: [],
    }));
  });

  it("✅ should update a patient successfully", async () => {
    mockRepo.update.mockResolvedValue(mockPatient);

    const result = await useCase.execute(mockPatient);

    expect(mockRepo.update).toHaveBeenCalledWith(mockPatient);
    expect(result).toBe(mockPatient);
  });

  it("❌ should throw error if repository fails", async () => {
    mockRepo.update.mockRejectedValue(new Error("Update failed"));

    await expect(useCase.execute(mockPatient))
      .rejects.toThrow("Update failed");
  });
});
