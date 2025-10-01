import { Gender, Patient } from "../../../domain/entities";
import { PatientRepository } from "../../../domain/repositories";
import { FindPatientByNameUseCase } from "../FindPatientByName.usecase";


describe("FindPatientByNameUseCase", () => {
  let useCase: FindPatientByNameUseCase;
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

    useCase = new FindPatientByNameUseCase(mockRepo);

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
        name: "John",
        lastName: "Smith",
        birthDate: new Date("1992-05-05"),
        gender: Gender.MALE,
        consultations: [],
      })),
    ];
  });

  it("✅ should find patients by name", async () => {
    mockRepo.findByName.mockResolvedValue(mockPatients);

    const result = await useCase.execute("John");

    expect(mockRepo.findByName).toHaveBeenCalledWith("John");
    expect(result).toBe(mockPatients);
  });

  it("❌ should throw error if repository fails", async () => {
    mockRepo.findByName.mockRejectedValue(new Error("Database error"));

    await expect(useCase.execute("John"))
      .rejects.toThrow("Database error");
  });
});
