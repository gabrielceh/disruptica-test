
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePatientDetailsStore } from "@modules/patients/presentation/stores/patientDetailStore";
import dayjs from "dayjs";
import { DialogAddConsultation } from "../DialogAddConsultation";


export  function TableConsultation() {
  const patient = usePatientDetailsStore(state => state.patient);
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Observations</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            patient?.consultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell>{dayjs(consultation.date).format('MM/DD/YYYY')}</TableCell>
                <TableCell>{consultation.reason}</TableCell>
                <TableCell>{consultation.observations}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <div className="w-full flex justify-end mt-4">
        <DialogAddConsultation/>
      </div>    
    </div>  
  )
}
