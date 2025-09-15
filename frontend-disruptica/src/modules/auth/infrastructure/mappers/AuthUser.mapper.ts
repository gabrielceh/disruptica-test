import type { AuthUser } from "@/core/domain/entities";
import type { AuthUserResponse } from "../models";

export class AuthUserMapper {
  static fromModelToEntity(authUserResponse: AuthUserResponse): AuthUser {
    return {
      token: authUserResponse.token,
      user:{
        id:    authUserResponse.user.id,
        email: authUserResponse.user.email,
        name:  authUserResponse.user.name,
        role:  authUserResponse.user.role,
      }
    };
  }
}