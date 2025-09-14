// src/patients/domain/entities/patient.entity.ts
import { Consultation } from "./Consultation.entity";
import { Gender } from "./Gender.enum";

export interface PatientProps {
  id?:             string;
  name:           string;
  lastName:       string;
  birthDate:      Date;
  gender:         Gender;
  consultations?: Consultation[];
}

export class Patient {
  public readonly id:   string;
  public name:          string;
  public lastName:      string;
  public birthDate:     Date;
  public gender:        Gender;
  public consultations: Consultation[];
  public isActive:      boolean;

  constructor(props: PatientProps) {
    this.id = props.id || crypto.randomUUID();
    this.name = props.name;
    this.lastName = props.lastName;
    this.birthDate = props.birthDate;
    this.gender = props.gender;
    this.consultations = props.consultations ?? [];
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  activate() {
    this.isActive = true;
  }


  addConsultation(consultation: Consultation) {
    this.consultations.push(consultation);
  }

}
