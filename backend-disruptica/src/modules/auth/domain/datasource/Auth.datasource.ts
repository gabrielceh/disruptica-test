import { User } from "@modules/auth/domain/entities";

export interface AuthDatasource {
  findByEmailAndPassowrd(email: string, password: string): Promise<User | null>;
}
