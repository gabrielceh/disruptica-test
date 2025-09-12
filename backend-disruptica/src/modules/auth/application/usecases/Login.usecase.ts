import { AuthRepository } from "@modules/auth/domain/repositories";
import { User } from "@modules/auth/domain/entities";

export class LoginUseCase {
  repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string): Promise<User | null> {
    return await this.repository.findByEmailAndPassword(email, password);
  }
}