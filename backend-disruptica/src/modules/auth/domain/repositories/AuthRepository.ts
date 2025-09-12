import { User } from "@modules/auth/domain/entities/User";

export interface AuthRepository {
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
}
