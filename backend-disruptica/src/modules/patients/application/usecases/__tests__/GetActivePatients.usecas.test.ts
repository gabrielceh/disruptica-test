import { Gender, Patient } from "../../../domain/entities";
import { PatientRepository } from "../../../domain/repositories";
import { GetActivePatientsUseCase } from "../GetActivePatients.usecase";


describe("GetActivePatientsUseCase", () => {
  let useCase: GetActivePatientsUseCase;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockPatients: Patient[];

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

    useCase = new GetActivePatientsUseCase(mockRepo);

    mockPatients = [
      Object.assign(new Patient({
        id: "p-1",
        name: "John",
        lastName: "Doe",
        birthDate: new Date("1990-01-01"),
        gender: Gender.MALE,
        consultations: [],
      })),
      Object.assign(new Patient({
        id: "p-2",
        name: "Jane",
        lastName: "Smith",
        birthDate: new Date("1992-05-05"),
        gender: Gender.FEMALE,
        consultations: [],
      })),
    ];
  });

  it("✅ should return active patients", async () => {
    mockRepo.getActivePatients.mockResolvedValue(mockPatients);

    const result = await useCase.execute();

    expect(mockRepo.getActivePatients).toHaveBeenCalled();
    expect(result).toBe(mockPatients);
  });

  it("❌ should throw error if repository fails", async () => {
    mockRepo.getActivePatients.mockRejectedValue(new Error("Database error"));

    await expect(useCase.execute()).rejects.toThrow("Database error");
  });
});
