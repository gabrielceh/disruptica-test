export class GetPatientByIdUsecase {
  constructor(private readonly repository: any) {}

  async execute(patientId: string): Promise<any> {
    return await this.repository.getPatientById(patientId);
  }
}