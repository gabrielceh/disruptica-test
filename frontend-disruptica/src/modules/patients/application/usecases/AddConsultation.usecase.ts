import type { BaseResponse } from "@/core/models";
import type { Consultation } from "../../domain/entities";
import type { PatientsRepository } from "../../domain/repositories";

export class AddConsultationUsecase {
  repository: PatientsRepository;
  
  constructor(repository: PatientsRepository) {
    this.repository = repository;
  }

  async execute(patientId: string, newConsultation: Partial<Consultation>): Promise<BaseResponse<Consultation | null>> {
    return await this.repository.addConsutlation(patientId, newConsultation);
  }
}