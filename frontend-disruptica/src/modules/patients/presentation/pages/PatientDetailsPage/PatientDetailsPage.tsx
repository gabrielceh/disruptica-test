import { useEffect } from "react";
import styles from "./patient-detail-page.module.css";
import { useQuery } from "@tanstack/react-query";
import { usePatientDetailsStore } from "@modules/patients/presentation/stores/patientDetailStore";
import { getPatientByIdUsecase } from "@/modules/patients/di/patients.dependencies";
import { useParams } from "react-router";

import { Loader, PageTitle } from "@/core/presentation/components";
import {PatientInfoSection, TableConsultation} from "@modules/patients/presentation/components/PatientsDetailPage/";


export  function PatientDetailsPage() {
  const id = useParams<{ id: string }>().id;
  const setPatient = usePatientDetailsStore(state => state.setPatient);

  const query = useQuery({
    queryKey: ['getPatientById', {id}],
    queryFn: () => getPatientByIdUsecase.execute(id || ""),
    refetchOnWindowFocus: false,
    retry: 1,
  })

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setPatient(query.data.data);      
      return;
    }
  }, [query.isSuccess, query.data]);

  return (
    <section className={styles.container}>
      <header><PageTitle title="Patient Details" /></header>
      {
        query?.isPending ? <Loader/> : null
      }

      <div className={styles.content}>
        {
            query?.data?.data === null && !query.isPending ? null : <>
            <PatientInfoSection/>
            <TableConsultation/>
          </>
        }
      </div>
      
    </section>
  )
}
