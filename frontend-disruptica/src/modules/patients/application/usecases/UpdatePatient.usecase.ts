import type { BaseResponse } from "@/core/models";
import type { Patient } from "../../domain/entities";
import type { PatientsRepository } from "../../domain/repositories";

export class UpdatePatientUsecase {
  repository: PatientsRepository;
  
  constructor(repository: PatientsRepository) {
    this.repository = repository;
  }

  async execute(patient: Partial<Patient>): Promise<BaseResponse<Patient | null>> {
    console.log("UpdatePatientUsecase.execute", patient);
    return await this.repository.updatePatient(patient);
  }
}