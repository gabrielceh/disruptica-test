interface ConsultationProps {
  id: string;
  date: Date;
  reason: string;
  observations: string;
}


export class Consultation {
  public readonly id: string;
  public date: Date;
  public reason: string;
  public observations: string;

  constructor(newConsultation: ConsultationProps) {
    this.id = newConsultation.id;
    this.date = newConsultation.date;
    this.reason = newConsultation.reason;
    this.observations = newConsultation.observations;
  }
 
}
