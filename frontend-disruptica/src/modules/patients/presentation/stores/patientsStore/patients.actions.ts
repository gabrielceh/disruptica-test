import type { Patient } from "@/modules/patients/domain/entities";


export interface PatientsActions {
	setPatientToEdit: (patient:Patient) => void
	setAllPatients: (patients:Array<Patient>) => void
}
