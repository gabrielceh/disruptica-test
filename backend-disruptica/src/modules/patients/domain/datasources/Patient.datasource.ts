import { Consultation, Patient } from "../entities";

export interface PatientDatasource {
  activate(patientId: string): Promise<boolean>;
  addConsultation(patientId: string, newConsultation: Partial<Consultation>): Promise<Consultation>;
  create(patient: Patient): Promise<Patient>;
  deactivate(patientId: string): Promise<boolean>;
  findByName(name: string): Promise<Patient[]>;
  getActivePatients(): Promise<Patient[]>;
  getPatientById(patientId: string): Promise<Patient | null>;
  update(patient: Patient): Promise<Patient>;
}
