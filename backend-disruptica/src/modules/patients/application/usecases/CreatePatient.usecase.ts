import { Patient } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";

export class CreatePatientUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(patient: Patient): Promise<Patient> {
    return this.repo.create(patient);
  }
}
