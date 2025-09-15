import type { AuthUser } from "@/core/domain/entities";
import type { BaseResponse } from "@/core/models";

export abstract class AuthRespository {
  abstract login(email: string, password: string): Promise<BaseResponse<AuthUser | null>>;
}