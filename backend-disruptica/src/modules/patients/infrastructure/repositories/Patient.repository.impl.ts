import { PatientDatasource } from "../../domain/datasources";
import { Consultation, Patient } from "../../domain/entities";
import { PatientRepository } from "../../domain/repositories";


export class PatientRepositoryImpl implements PatientRepository {
  constructor(private readonly datasource: PatientDatasource) {}

  getActivePatients(): Promise<Patient[]> {
    return this.datasource.getActivePatients();
  }

  findByName(name: string): Promise<Patient[]> {
    return this.datasource.findByName(name);
  }

  create(patient: Patient): Promise<Patient> {
    return this.datasource.create(patient);
  }

  update(patient: Patient): Promise<Patient> {
    return this.datasource.update(patient);
  }

  deactivate(patientId: string): Promise<void> {
    return this.datasource.deactivate(patientId);
  }

  activate(patientId: string): Promise<void> {
    return this.datasource.activate(patientId);
  }

  addConsultation(patientId: string, consultation: Consultation): Promise<void> {
    return this.datasource.addConsultation(patientId, consultation);
  }
}
