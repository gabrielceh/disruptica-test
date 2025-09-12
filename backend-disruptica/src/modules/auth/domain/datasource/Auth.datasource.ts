import { User } from "@modules/auth/domain/entities/User";

export interface AuthDatasource {
  findByEmailAndPassowrd(email: string, password: string): Promise<User | null>;
}
