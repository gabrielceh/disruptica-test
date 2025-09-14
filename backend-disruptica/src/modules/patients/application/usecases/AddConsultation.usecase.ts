import {  Consultation } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";

export class AddConsultationUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(patientId: string, consultation: Consultation): Promise<Consultation> {
    return this.repo.addConsultation(patientId, consultation);
  }
}