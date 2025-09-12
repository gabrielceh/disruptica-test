import { Consultation, Patient } from "../entities";



export interface PatientDatasource {
  activate(patientId: string): Promise<void>;
  addConsultation(patientId: string, consultation: Consultation): Promise<void>;
  create(patient: Patient): Promise<Patient>;
  deactivate(patientId: string): Promise<void>;
  findByName(name: string): Promise<Patient[]>;
  getActivePatients(): Promise<Patient[]>;
  update(patient: Patient): Promise<Patient>;
}
