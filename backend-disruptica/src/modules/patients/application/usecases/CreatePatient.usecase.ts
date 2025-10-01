import { Patient } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { CreatePatientDTO } from "../../domain/dto";

export class CreatePatientUseCase {
  constructor(private readonly repo: PatientRepository) {}

  async execute(patient: CreatePatientDTO): Promise<Patient> {
    return this.repo.create(patient);
  }
}
