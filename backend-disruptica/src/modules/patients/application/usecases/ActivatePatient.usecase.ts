
import { PatientRepository } from "@modules/patients/domain/repositories";

export class ActivatePatientUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repo.activate(id);
  }
}