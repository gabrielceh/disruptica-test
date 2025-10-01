import { PatientDatasource } from "../../domain/datasources";
import { AddConsultationDTO, CreatePatientDTO } from "../../domain/dto";
import { Consultation, Patient } from "../../domain/entities";
import { PatientRepository } from "../../domain/repositories";


export class PatientRepositoryImpl implements PatientRepository {
  constructor(private readonly datasource: PatientDatasource) {}

  getActivePatients(): Promise<Patient[]> {
    return this.datasource.getActivePatients();
  }

  getPatientById(patientId: string): Promise<Patient | null> {
    return this.datasource.getPatientById(patientId);
  }

  findByName(name: string): Promise<Patient[]> {
    return this.datasource.findByName(name);
  }

  create(patient: CreatePatientDTO): Promise<Patient> {
    return this.datasource.create(patient);
  }

  update(patient: Patient): Promise<Patient> {
    return this.datasource.update(patient);
  }

  deactivate(patientId: string): Promise<boolean> {
    return this.datasource.deactivate(patientId);
  }

  activate(patientId: string): Promise<boolean> {
    return this.datasource.activate(patientId);
  }

  addConsultation(patientId: string, consultation: AddConsultationDTO): Promise<Consultation> {
    return this.datasource.addConsultation(patientId, consultation);
  }
}
