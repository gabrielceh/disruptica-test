
import { PatientRepository } from "@modules/patients/domain/repositories";

export class DeactivatePatientUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.deactivate(id);
  }
}