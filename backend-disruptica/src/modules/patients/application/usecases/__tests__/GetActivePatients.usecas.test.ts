import { PatientRepository } from "@src/modules/patients/domain/repositories";
import { GetActivePatientsUseCase } from "../GetActivePatients.usecase";
import { Patient, Gender } from "@modules/patients/domain/entities";


describe("GetActivePatientsUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: GetActivePatientsUseCase;

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
    usecase = new GetActivePatientsUseCase(mockRepo);
  });

  it("should return only active patients", async () => {
    const patient = new Patient({
      id: "p1",
      name: "Pedro",
      lastName: "Martínez",
      birthDate: new Date("1980-01-01"),
      gender: Gender.MALE,
    });

    mockRepo.getActivePatients.mockResolvedValue([patient]);

    const result = await usecase.execute();

    expect(result).toEqual([patient]);
    expect(mockRepo.getActivePatients).toHaveBeenCalled();
  });
});
