interface PatientResponseProps {
  id:            string;
  name:          string;
  lastName:      string;
  birthDate:     Date;
  gender:        string;
  consultations: ConsultationResponseProps[];
  isActive:      boolean;
}

export class PatientResponse {
  public id:            string;
  public name:          string;
  public lastName:      string;
  public birthDate:     Date;
  public gender:        string;
  public consultations: ConsultationResponseProps[];
  public isActive:      boolean;

  constructor(patient:PatientResponseProps){
    this.id = patient.id;
    this.name = patient.name;
    this.lastName = patient.lastName;
    this.birthDate = patient.birthDate;
    this.gender = patient.gender;
    this.consultations = patient.consultations;
    this.isActive = patient.isActive;
  }

  static fromJSON(json: any): PatientResponse {
    return new PatientResponse({
      id:            json.id ?? '',
      name:          json.name ?? '',
      lastName:      json.lastName ?? '',
      birthDate:     json.birthDate ?? new Date(),
      gender:        json.gender ?? '',
      consultations: json.consultations ?? [],
      isActive:      json.isActive ?? false,
    });
  }
}

interface ConsultationResponseProps {
  id:           string;
  date:         Date;
  reason:       string;
  observations: string;
}

export class ConsultationResponse {
  public id:           string;
  public date:         Date;
  public reason:       string;
  public observations: string;

  constructor(consultation:ConsultationResponseProps){
    this.id = consultation.id;
    this.date = consultation.date;
    this.reason = consultation.reason;
    this.observations = consultation.observations;
  }

  static fromJSON(json: any): ConsultationResponse {
    return new ConsultationResponse({
      id:           json.id ?? '',
      date:         json.date ?? new Date(),
      reason:       json.reason ?? '',
      observations: json.observations ?? '',
    });
  }
}
