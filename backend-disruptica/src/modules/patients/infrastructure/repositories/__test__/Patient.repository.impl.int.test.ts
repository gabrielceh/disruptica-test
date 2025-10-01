import { PatientDatasource } from "@src/modules/patients/domain/datasources";
import { PatientRepositoryImpl } from "../Patient.repository.impl";
import { Consultation, Gender, Patient } from "@src/modules/patients/domain/entities";
import { AddConsultationDTO, CreatePatientDTO } from "@src/modules/patients/domain/dto";


// Creamos un mock del datasource
const mockDatasource: jest.Mocked<PatientDatasource> = {
  getActivePatients: jest.fn(),
  getPatientById: jest.fn(),
  findByName: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  deactivate: jest.fn(),
  activate: jest.fn(),
  addConsultation: jest.fn(),
};

describe("PatientRepositoryImpl", () => {
  let repository: PatientRepositoryImpl;
  let mockPatient: Patient;
  let mockConsultation: Consultation;

  beforeAll(() => {
    repository = new PatientRepositoryImpl(mockDatasource);

    mockPatient = Object.assign(new Patient(), {
      id: "p-1",
      name: "John Doe",
      isActive: true,
      consultations: [],
    });

    mockConsultation = Object.assign(new Consultation(), {
      id: "c-1",
      date: new Date(),
      reason: "Headache",
      observations: "Take rest",
      patient: mockPatient,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("✅ should return active patients", async () => {
    mockDatasource.getActivePatients.mockResolvedValue([mockPatient]);

    const result = await repository.getActivePatients();

    expect(mockDatasource.getActivePatients).toHaveBeenCalled();
    expect(result).toEqual([mockPatient]);
  });

  it("✅ should return patient by id", async () => {
    mockDatasource.getPatientById.mockResolvedValue(mockPatient);

    const result = await repository.getPatientById("p-1");

    expect(mockDatasource.getPatientById).toHaveBeenCalledWith("p-1");
    expect(result).toBe(mockPatient);
  });

  it("✅ should find patients by name", async () => {
    mockDatasource.findByName.mockResolvedValue([mockPatient]);

    const result = await repository.findByName("John Doe");

    expect(mockDatasource.findByName).toHaveBeenCalledWith("John Doe");
    expect(result).toEqual([mockPatient]);
  });

  it("✅ should create a new patient", async () => {
    const dto: CreatePatientDTO = {
       name: "Jane",
       birthDate: new Date("1995-05-05"),
       gender: Gender.MALE,
       lastName: "Doe",
    };
    mockDatasource.create.mockResolvedValue(mockPatient);

    const result = await repository.create(dto);

    expect(mockDatasource.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(mockPatient);
  });

  it("✅ should update a patient", async () => {
    mockDatasource.update.mockResolvedValue(mockPatient);

    const result = await repository.update(mockPatient);

    expect(mockDatasource.update).toHaveBeenCalledWith(mockPatient);
    expect(result).toBe(mockPatient);
  });

  it("✅ should deactivate a patient", async () => {
    mockDatasource.deactivate.mockResolvedValue(true);

    const result = await repository.deactivate("p-1");

    expect(mockDatasource.deactivate).toHaveBeenCalledWith("p-1");
    expect(result).toBe(true);
  });

  it("✅ should activate a patient", async () => {
    mockDatasource.activate.mockResolvedValue(true);

    const result = await repository.activate("p-1");

    expect(mockDatasource.activate).toHaveBeenCalledWith("p-1");
    expect(result).toBe(true);
  });

  it("✅ should add a consultation", async () => {
    const dto: AddConsultationDTO = {
      date: new Date(),
      reason: "Flu",
      observations: "Rest for 3 days",
    };
    mockDatasource.addConsultation.mockResolvedValue(mockConsultation);

    const result = await repository.addConsultation("p-1", dto);

    expect(mockDatasource.addConsultation).toHaveBeenCalledWith("p-1", dto);
    expect(result).toBe(mockConsultation);
  });
});
