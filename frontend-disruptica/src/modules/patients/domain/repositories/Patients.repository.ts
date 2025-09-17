import type { BaseResponse } from "@/core/models";
import type { Patient } from "@modules/patients/domain/entities";

export abstract class PatientsRepository {
  abstract getPatients(): Promise<BaseResponse<Patient[] | null>>;
  abstract getPatient(patientId:string): Promise<BaseResponse<Patient | null>>;
  abstract updatePatient(patient:Partial<Patient>): Promise<BaseResponse<Patient | null>>;

}