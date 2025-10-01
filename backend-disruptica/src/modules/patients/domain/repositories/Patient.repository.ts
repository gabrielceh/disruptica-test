import { AddConsultationDTO, CreatePatientDTO } from "../dto";
import { Consultation, Patient } from "../entities";



export interface PatientRepository {
  activate(patientId: string): Promise<boolean>;
  addConsultation(patientId: string, consultation: AddConsultationDTO): Promise<Consultation>;
  create(patient: CreatePatientDTO): Promise<Patient>;
  deactivate(patientId: string): Promise<boolean>;
  findByName(name: string): Promise<Patient[]>;
  getActivePatients(): Promise<Patient[]>;
  getPatientById(patientId: string): Promise<Patient | null>;
  update(patient: Patient): Promise<Patient>;
}
