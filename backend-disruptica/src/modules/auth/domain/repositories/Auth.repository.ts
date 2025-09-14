import { User } from "@modules/auth/domain/entities";

export interface AuthRepository {
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
}
