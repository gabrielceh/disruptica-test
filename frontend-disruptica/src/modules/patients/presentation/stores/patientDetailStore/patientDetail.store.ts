import { create } from 'zustand';
import type { Patient } from '@/modules/patients/domain/entities';
import type { PatientDetailsState } from './patientDetail.state';
import type { PatientDetailActions } from './patientsDetails.actions';

export const usePatientDetailsStore = create<PatientDetailsState & PatientDetailActions>()((set) => ({
    patient: null,

    setPatient: async (patient: Patient | null) => {
	  set({ patient: patient });
	}
	
}));
