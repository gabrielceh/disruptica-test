import type { BaseResponse } from "@/core/models";
import type { Consultation, Patient } from "@modules/patients/domain/entities";

export abstract class PatientsDatasource {
  abstract getPatients(): Promise<BaseResponse<Patient[] | null>>;
  abstract getPatient(patientId:string): Promise<BaseResponse<Patient | null>>;
  abstract updatePatient(patient:Partial<Patient>): Promise<BaseResponse<Patient | null>>;
  abstract addConsutlation(patientId:string, newConsultation:Partial<Consultation>): Promise<BaseResponse<Consultation | null>>;
}