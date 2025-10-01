import {  Consultation } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { AddConsultationDTO } from "@modules/patients/domain/dto";

export class AddConsultationUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(patientId: string, consultation: AddConsultationDTO): Promise<Consultation> {
    return this.repo.addConsultation(patientId, consultation);
  }
}