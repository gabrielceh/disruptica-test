import { CreatePatientUseCase } from "../CreatePatient.usecase";
import { PatientRepository } from "@src/modules/patients/domain/repositories";
import { Patient, Gender } from "@modules/patients/domain/entities";


describe("CreatePatientUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: CreatePatientUseCase;

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
    usecase = new CreatePatientUseCase(mockRepo);
  });

  it("should create a patient", async () => {
    const patient = new Patient({
      id: "p1",
      name: "Juan",
      lastName: "Pérez",
      birthDate: new Date("1990-01-01"),
      gender: Gender.MALE,
    });

    mockRepo.create.mockResolvedValue(patient);

    const result = await usecase.execute(patient);

    expect(result).toBe(patient);
    expect(mockRepo.create).toHaveBeenCalledWith(patient);
  });
});
