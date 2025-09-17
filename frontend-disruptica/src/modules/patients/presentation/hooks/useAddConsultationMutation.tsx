import { useMutation } from "@tanstack/react-query";
import { addConsultationUsecase } from "../../di/patients.dependencies";
import { usePatientDetailsStore } from "../stores/patientDetailStore";
import type { Consultation } from "../../domain/entities";

interface PropsAddConsultation {
  patientId: string;
  consultation: Partial<Consultation>;
}

export  function useAddConsultationMutation() {
  const addNewConsultation = usePatientDetailsStore(state => state.addNewConsultation);

  const mutation = useMutation({
    mutationFn:async(data:PropsAddConsultation)=> addConsultationUsecase.execute(data.patientId, data.consultation),
    onSuccess: (data, variables) => {
      if(data.data === null) {
        throw new Error(data.message);
      }
      const {patientId} = variables

      addNewConsultation( patientId, data.data);
    },
   
  })

  return mutation;
}
