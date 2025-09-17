import  dayjs  from "dayjs";
import type { Patient } from "@/modules/patients/domain/entities";
import { usePatientsStore } from "../../../stores/patientsStore";

import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router";
import { PatientsRoutes } from "@/modules/patients/router";

export  function TablePatients() {
  const navigate = useNavigate();
  const patients: Array<Patient> = usePatientsStore(state => state.patients);

  const onClickPatient = (id: string) => {
    navigate(`/${PatientsRoutes.patients}/${PatientsRoutes.patient}/${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {
          patients.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name} {patient.lastName}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{dayjs(patient.birthDate).format('MM/DD/YYYY')}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={()=>onClickPatient(patient.id)}>
                    <Eye/>
                  </Button>

                  <Button>
                    <Trash/>
                  </Button>
 
                </div>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
