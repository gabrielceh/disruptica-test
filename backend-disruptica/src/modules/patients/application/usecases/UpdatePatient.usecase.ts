import { Patient } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";

export class UpdatePatientUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute( patient: Patient): Promise<Patient | null> {
    return this.repo.update(patient);
  }
}