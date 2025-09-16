import type { BaseResponse } from "@/core/models";
import type { Patient } from "../../domain/entities";
import type { PatientsRepository } from "../../domain/repositories";

export class GetPatientByIdUsecase {
  repository: PatientsRepository;

  constructor(repository: PatientsRepository) {
    this.repository = repository;
  }

  async execute(patientId:string): Promise<BaseResponse<Patient | null>> {
    return await this.repository.getPatient(patientId);
  }
}