import { SeedDataRepository } from "../../domain/repositories";

export class GenerateSeedUseCase {
  repository: SeedDataRepository;

  constructor(repository: SeedDataRepository) {
    this.repository = repository;
  }

  async execute(): Promise<boolean> {
    return await this.repository.generate();
  }
}