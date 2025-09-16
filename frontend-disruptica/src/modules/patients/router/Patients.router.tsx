import { Route, Routes } from "react-router";
import { PatientDetailsPage, PatientsPage } from "../presentation/pages";
import { PatientsRoutes } from "./Patients.routes";


export  function PatientsRouter() {
  return (
    <Routes>
        <Route index path="/" element={<PatientsPage/>} />
        <Route path={`${PatientsRoutes.patient}/:id`} element={<PatientDetailsPage/>} />
    </Routes>
  )
}
