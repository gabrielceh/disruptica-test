import { PatientDatasource } from "../../domain/datasources";
import { Consultation, Gender, Patient } from "../../domain/entities";
import { PatientRepositoryImpl } from "./Patient.repository.impl";


describe("PatientRepositoryImpl (delegation)", () => {
  let mockDatasource: jest.Mocked<PatientDatasource>;

  let repo: PatientRepositoryImpl;

  beforeEach(() => {
     mockDatasource = {
      activate: jest.fn(),
      addConsultation: jest.fn(),
      create: jest.fn(),
      deactivate: jest.fn(),
      findByName: jest.fn(),
      getActivePatients: jest.fn(),
      update: jest.fn(),

    };

    repo = new PatientRepositoryImpl(mockDatasource);
  });

  it("getActivePatients delega en datasource", async () => {
    mockDatasource.getActivePatients.mockResolvedValue([]);
    await repo.getActivePatients();
    expect(mockDatasource.getActivePatients).toHaveBeenCalled();
  });

  it("create delega y pasa la entidad", async () => {
    const p = new Patient({
      id: "m1",
      name: "Mock",
      lastName: "One",
      birthDate: new Date(),
      gender: Gender.OTHER,
    });
    mockDatasource.create.mockResolvedValue(p);
    const res = await repo.create(p);
    expect(mockDatasource.create).toHaveBeenCalledWith(p);
    expect(res).toBe(p);
  });

  it("addConsultation delega con patientId y consultation", async () => {
    const c = new Consultation({id:"cMock", date: new Date(), reason: "Reason", observations: "Obs"});  
    mockDatasource.addConsultation.mockResolvedValue(c);
    await repo.addConsultation("m1", c);
    expect(mockDatasource.addConsultation).toHaveBeenCalledWith("m1", c);
  });
});
