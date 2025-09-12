import { Consultation, Patient } from "../entities";



export interface PatientDatasource {
  getActivePatients(): Promise<Patient[]>;
  findByName(name: string): Promise<Patient[]>;
  create(patient: Patient): Promise<Patient>;
  update(patient: Patient): Promise<Patient>;
  deactivate(patientId: string): Promise<void>;
  activate(patientId: string): Promise<void>;
  addConsultation(patientId: string, consultation: Consultation): Promise<void>;
}
