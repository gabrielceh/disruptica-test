import type { AuthUser, User } from "@/core/domain/entities";

export interface AuthState {
	token: AuthUser['token'];
	user: User;

}
