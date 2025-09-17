import { PageTitle } from "@/core/presentation/components";
import { TablePatients } from "../../components/PatientsPage";
import { useQuery } from "@tanstack/react-query";
import { getPatientsUsecase } from "@/modules/patients/di/patients.dependencies";
import { useEffect } from "react";
import { usePatientsStore } from "../../stores/patientsStore";


export function PatientsPage() {
  const setPatients = usePatientsStore(state => state.setAllPatients);

  const query = useQuery({
    queryKey: ['getPatients'],
    queryFn: () => getPatientsUsecase.execute(),
    refetchOnWindowFocus: false,
    retry: 1,
  })

  useEffect(() => {
    if (query.isSuccess && query.data) {
      if(query.data.data) {
        setPatients(query.data.data);
        return;
      }
    }

    setPatients([]);

  }, [query.isSuccess, query.data]);

  return (
    <section>
      <header><PageTitle title="Patients" /></header>

      <TablePatients/>
    </section>
  )
}
