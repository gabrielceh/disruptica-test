import { Navigate } from "react-router";
import { useAuthStore } from "@/core/stores/auth";
import { hasTokenExp } from "@core/utils";
import { AuthRoutes } from "@/modules/auth/router";
import { PatientsRoutes } from "@/modules/patients/router";


export function RootPage() {
	const token = useAuthStore((state) => state.token);
	const logout = useAuthStore((state) => state.setLogout);

	if (!token) {
		logout();
		return <Navigate to={`/${AuthRoutes.auth}/${AuthRoutes.login}`} />;
	}

	const isTokenExp = hasTokenExp(token);
	if (isTokenExp) {
		logout();
		return <Navigate to={`/${AuthRoutes.auth}/${AuthRoutes.login}`} />;
	}

	const targetRoute = token ? `/${PatientsRoutes.patients}` : `/${AuthRoutes.auth}/${AuthRoutes.login}`;

	return <Navigate to={targetRoute} />;
}
