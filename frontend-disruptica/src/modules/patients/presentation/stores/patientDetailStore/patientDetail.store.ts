import { create } from 'zustand';
import type { Consultation, Patient } from '@/modules/patients/domain/entities';
import type { PatientDetailsState } from './patientDetail.state';
import type { PatientDetailActions } from './patientsDetails.actions';

export const usePatientDetailsStore = create<PatientDetailsState & PatientDetailActions>()((set, get) => ({
    patient: null,

    setPatient: (patient: Patient | null) => {
	  set({ patient: patient });
	},

    addNewConsultation: (patientId: string, consultation: Consultation) => {
      const {patient} = get()
      if(!patient) return;
      if(patientId !== patient.id) return;

      set({ patient: { ...patient, consultations: [consultation, ...patient.consultations] } });
    }
	
}));
