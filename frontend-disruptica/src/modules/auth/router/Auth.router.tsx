
import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from '../presentation/pages';
import { AuthRoutes } from './auth.routes';
import { useAuthStore } from '@/core/stores/auth';
import { hasTokenExp } from '@/core/utils';

export function AuthRouter() {
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

	if(token) {
        return <Navigate to={`/home`} />;
    }

  return (
    <Routes>
      <Route path="/" >
        <Route path={AuthRoutes.login} element={<LoginPage/>} />
      </Route>
    </Routes>
  )
}
