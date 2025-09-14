import { FindPatientByNameUseCase } from "../FindPatientByName.usecase";
import { PatientRepository } from "@src/modules/patients/domain/repositories";
import { Patient, Gender } from "@modules/patients/domain/entities";


describe("FindPatientByNameUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: FindPatientByNameUseCase;

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
    usecase = new FindPatientByNameUseCase(mockRepo);
  });

  it("should find patients by name", async () => {
    const patient = new Patient({
      id: "p1",
      name: "Ana",
      lastName: "García",
      birthDate: new Date("1995-01-01"),
      gender: Gender.FEMALE,
    });

    mockRepo.findByName.mockResolvedValue([patient]);

    const result = await usecase.execute("Ana");

    expect(result).toEqual([patient]);
    expect(mockRepo.findByName).toHaveBeenCalledWith("Ana");
  });
});
