import { useMutation } from "@tanstack/react-query";
import { updatePatientUsecase } from "../../di/patients.dependencies";
import { usePatientDetailsStore } from "../stores/patientDetailStore";
import type { Patient } from "../../domain/entities";


export  function useUpdatePatientMutation() {
  const setPatient = usePatientDetailsStore(state => state.setPatient);

  const mutation = useMutation({
    mutationFn:async(patient:Partial<Patient>)=> updatePatientUsecase.execute(patient),
    onSuccess: (data) => {
      if(data.data === null) {
        throw new Error(data.message);
      }

      setPatient(data.data);
    },
   
  })

  return mutation;
}
