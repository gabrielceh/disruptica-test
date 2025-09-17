import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/auth";
import { hasTokenExp } from "../utils";
import { AuthRoutes } from "@/modules/auth/router";
import { MainLayout } from "../presentation/layouts";



export  function PrivateRoute() {
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

	return <MainLayout>
              <Outlet />
          </MainLayout>;
}
