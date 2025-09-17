import type { Consultation, Patient } from "@/modules/patients/domain/entities";


export interface PatientDetailActions {
  setPatient: (patient:Patient | null) => void
  addNewConsultation: (patientId:string, consultation:Consultation) => void
}
