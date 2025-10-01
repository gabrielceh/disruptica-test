import { CreatePatientDTO } from "../../../domain/dto";
import { Gender, Patient } from "../../../domain/entities";
import { PatientRepository } from "../../../domain/repositories";
import { CreatePatientUseCase } from "../CreatePatient.usecase";


describe("CreatePatientUseCase", () => {
  let useCase: CreatePatientUseCase;
  let mockRepo: jest.Mocked<PatientRepository>;
  let mockPatient: Patient;
  let mockDto: CreatePatientDTO;

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

    useCase = new CreatePatientUseCase(mockRepo);

    mockDto = {
      name: "Jane",
      lastName: "Doe",
      birthDate: new Date("1995-05-05"),
      gender: Gender.FEMALE,
    };

    mockPatient = Object.assign(new Patient({
      ...mockDto,
      id: "p-1",
      consultations: [],
    }));
  });

  it("✅ should create a new patient", async () => {
    mockRepo.create.mockResolvedValue(mockPatient);

    const result = await useCase.execute(mockDto);

    expect(mockRepo.create).toHaveBeenCalledWith(mockDto);
    expect(result).toBe(mockPatient);
  });

  it("❌ should throw error if repository fails", async () => {
    mockRepo.create.mockRejectedValue(new Error("Failed to create patient"));

    await expect(useCase.execute(mockDto))
      .rejects.toThrow("Failed to create patient");
  });
});
