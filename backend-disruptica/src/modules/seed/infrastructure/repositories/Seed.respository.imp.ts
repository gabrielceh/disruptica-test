import { SeedDataSource } from "../../domain/datasources";
import { SeedDataRepository } from "../../domain/repositories";

export class SeedRepositoryImp implements SeedDataRepository {
  constructor(private readonly datasource: SeedDataSource) {}

  async generate() {
    return await this.datasource.generate();
  }

}