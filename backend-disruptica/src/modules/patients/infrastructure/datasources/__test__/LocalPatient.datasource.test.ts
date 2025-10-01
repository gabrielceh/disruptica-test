import { DbPatientsDatasource } from "@modules/patients/infrastructure/datasources/DbPatients.datasource";
import { Patient, Consultation, Gender } from "@modules/patients/domain/entities";
import { CreatePatientDTO, AddConsultationDTO } from "@modules/patients/domain/dto";

// Creamos mocks para los repos
const mockPatientRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
};

const mockConsultationRepo = {
  create: jest.fn(),
  save: jest.fn(),
};

// Mock de AppDataSource
jest.mock("@src/core/infraestructure/config/datasource", () => {
  return {
    AppDataSource: {
      getRepository: jest
        .fn()
        .mockImplementation((entity) => {
          if (entity.name === "Patient") return mockPatientRepo;
          if (entity.name === "Consultation") return mockConsultationRepo;
        }),
    },
  };
});

describe("DbPatientsDatasource", () => {
  let datasource: DbPatientsDatasource;
  let mockPatient: Patient;

  beforeAll(() => {
    datasource = new DbPatientsDatasource();

    mockPatient = Object.assign(new Patient(), {
      id: "uuid-1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      gender: "M",
      isActive: true,
      consultations: [],
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("✅ should create a patient", async () => {
    const dto: CreatePatientDTO = {
      name: "Jane",
      lastName: "Doe",
      birthDate: new Date("1995-05-05"),
      gender: Gender.FEMALE,
    };

    mockPatientRepo.create.mockReturnValue(dto);
    mockPatientRepo.save.mockResolvedValue(mockPatient);

    const result = await datasource.create(dto);

    expect(mockPatientRepo.create).toHaveBeenCalledWith({ ...dto, isActive: true });
    expect(mockPatientRepo.save).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Patient);
    expect(result.name).toBe("John");
  });

  it("✅ should update existing patient", async () => {
    mockPatientRepo.findOne.mockResolvedValue(mockPatient);
    mockPatientRepo.save.mockResolvedValue({ ...mockPatient, name: "Updated" });

    const result = await datasource.update({ ...mockPatient, name: "Updated" });

    expect(mockPatientRepo.findOne).toHaveBeenCalledWith({
      where: { id: mockPatient.id },
      relations: ["consultations"],
    });
    expect(result.name).toBe("Updated");
  });

  it("❌ should throw error when updating non-existent patient", async () => {
    mockPatientRepo.findOne.mockResolvedValue(null);

    await expect(datasource.update(mockPatient)).rejects.toThrow(
      `Patient with id ${mockPatient.id} not found`
    );
  });

  it("✅ should deactivate a patient", async () => {
    mockPatientRepo.findOne.mockResolvedValue(mockPatient);
    mockPatientRepo.update.mockResolvedValue({ affected: 1 });

    const result = await datasource.deactivate(mockPatient.id);

    expect(result).toBe(true);
    expect(mockPatientRepo.update).toHaveBeenCalledWith(mockPatient.id, {
      isActive: false,
    });
  });

  it("❌ should return false when deactivating non-existent patient", async () => {
    mockPatientRepo.findOne.mockResolvedValue(null);

    const result = await datasource.deactivate("non-existent");

    expect(result).toBe(false);
  });

  it("✅ should add consultation to existing patient", async () => {
    mockPatientRepo.findOne.mockResolvedValue(mockPatient);
    const newConsultation: AddConsultationDTO = {
      date: new Date(),
      reason: "Flu",
      observations: "Rest for 5 days",
    };
    const consultation = Object.assign(new Consultation({
      ...newConsultation,
      date: newConsultation.date!,
    }), { id: "c-1" });

    mockConsultationRepo.create.mockReturnValue(consultation);
    mockConsultationRepo.save.mockResolvedValue(consultation);

    const result = await datasource.addConsultation(mockPatient.id, newConsultation);

    expect(mockConsultationRepo.create).toHaveBeenCalledWith({
      ...newConsultation,
      patient: mockPatient,
    });
    expect(result).toBeInstanceOf(Consultation);
  });

  it("❌ should throw error if patient not found when adding consultation", async () => {
    mockPatientRepo.findOne.mockResolvedValue(null);

    const newConsultation: AddConsultationDTO = {
      date: new Date(),
      reason: "Headache",
      observations: "Take aspirin",
    };

    await expect(
      datasource.addConsultation("non-existent", newConsultation)
    ).rejects.toThrow("Patient not found");
  });

  it("❌ should throw error if consultation data is invalid", async () => {
    mockPatientRepo.findOne.mockResolvedValue(mockPatient);

    const invalidConsultation: AddConsultationDTO = {
      date: new Date(),
      reason: "",
      observations: "",
    };

    await expect(
      datasource.addConsultation(mockPatient.id, invalidConsultation)
    ).rejects.toThrow("Observations and reason are required");
  });
});
