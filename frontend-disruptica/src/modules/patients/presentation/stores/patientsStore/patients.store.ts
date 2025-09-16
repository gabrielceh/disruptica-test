import { create } from 'zustand';
import type { PatientsState } from './patients.state';
import type { PatientsActions } from './patients.actions';
import type { Patient } from '@/modules/patients/domain/entities';

export const usePatientsStore = create<PatientsState & PatientsActions>()((set) => ({
	patients: [],
    patientToEdit: null,

    setPatientToEdit: async (patient: Patient) => {
		 set({ patientToEdit: patient });
	},
	

	setAllPatients:  (patiens: Array<Patient>) => {
		 set({ patients: patiens });
	},
}));
