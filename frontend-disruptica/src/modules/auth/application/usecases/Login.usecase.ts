import type { AuthUser } from "@/core/domain/entities";
import type { BaseResponse } from "@/core/models";
import type { AuthRespository } from "@modules/auth/domain/repositories";

export class LoginUsecase {
  authRespository: AuthRespository;

  constructor(authRespository: AuthRespository) {
    this.authRespository = authRespository;
  }

  async execute(email: string, password: string): Promise<BaseResponse<AuthUser | null>> {
    return await this.authRespository.login(email, password);

  }

}