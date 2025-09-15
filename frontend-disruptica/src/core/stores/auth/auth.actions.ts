import type { AuthUser } from "@/core/domain/entities";

export interface AuthActions {
	setUserAuth: ({ token, user }: AuthUser) => void;
	setLogout: () => void;
}
