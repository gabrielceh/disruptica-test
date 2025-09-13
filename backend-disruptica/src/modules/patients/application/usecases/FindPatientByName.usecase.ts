import { Patient } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";

export class FindPatientByNameUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(name: string): Promise<Patient[]> {
    return this.repo.findByName(name);
  }
}