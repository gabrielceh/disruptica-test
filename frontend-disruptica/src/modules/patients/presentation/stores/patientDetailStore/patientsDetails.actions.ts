import type { Patient } from "@/modules/patients/domain/entities";


export interface PatientDetailActions {
	setPatient: (patient:Patient | null) => void
}
