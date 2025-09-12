import { AuthRepository } from "@modules/auth/domain/repositories";
import { AuthDatasource } from "@modules/auth/domain/datasource";
import { User } from "@modules/auth/domain/entities";

export class AuthRepositoryImpl implements AuthRepository {
  authDatasource: AuthDatasource;

  constructor(authDatasource: AuthDatasource) {
    this.authDatasource = authDatasource;
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.authDatasource.findByEmailAndPassowrd(email, password);
  }


}