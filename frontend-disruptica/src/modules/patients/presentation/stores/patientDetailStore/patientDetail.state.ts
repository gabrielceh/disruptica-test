import type { Patient } from "@/modules/patients/domain/entities";



export interface PatientDetailsState {
  patient: Patient | null;
}
