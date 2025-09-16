import type { Patient } from "@/modules/patients/domain/entities";



export interface PatientsState {
	patients: Array<Patient>;
  patientToEdit: Patient | null;
}
