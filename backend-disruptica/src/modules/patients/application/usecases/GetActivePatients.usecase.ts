import { Patient } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";

export class GetActivePatientsUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    return this.repo.getActivePatients();
  }
}