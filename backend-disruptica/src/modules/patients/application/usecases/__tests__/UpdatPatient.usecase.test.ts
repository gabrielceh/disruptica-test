import { UpdatePatientUseCase } from "../UpdatePatient.usecase";
import { PatientRepository } from "@src/modules/patients/domain/repositories";
import { Patient, Gender } from "@modules/patients/domain/entities";


describe("UpdatePatientUseCase", () => {
  let mockRepo: jest.Mocked<PatientRepository>;
  let usecase: UpdatePatientUseCase;

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
    usecase = new UpdatePatientUseCase(mockRepo);
  });

  it("should update a patient", async () => {
    const patient = new Patient({
      id: "p1",
      name: "Laura",
      lastName: "Ramírez",
      birthDate: new Date("1992-01-01"),
      gender: Gender.FEMALE,
    });

    mockRepo.update.mockResolvedValue(patient);

    const result = await usecase.execute(patient);

    expect(result).toBe(patient);
    expect(mockRepo.update).toHaveBeenCalledWith(patient);
  });
});
