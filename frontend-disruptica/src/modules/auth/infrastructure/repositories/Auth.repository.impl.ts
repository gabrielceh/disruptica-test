import type { AuthUser } from "@/core/domain/entities";
import type { AuthRespository } from "@modules/auth/domain/repositories";
import type { AuthDatasource } from "@modules/auth/domain/datasources";
import type { BaseResponse } from "@/core/models";

export class AuthRespositoryImpl implements AuthRespository {
    private readonly authDatasource: AuthDatasource;

    constructor(datasource: AuthDatasource) {
      this.authDatasource = datasource;
    }

    async login(email: string, password: string): Promise<BaseResponse<AuthUser | null>> {
      return await this.authDatasource.login(email, password);
    }
}