import { Route, Routes } from "react-router";
import { AuthRoutes, AuthRouter } from "@/modules/auth/router";
import { RootPage } from "./RootPage";
import { PatientsRouter, PatientsRoutes } from "@/modules/patients/router";
import { PrivateRoute } from "./PrivateRoute";

export function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<RootPage/>} />
        <Route path={`${AuthRoutes.auth}/*`} element={<AuthRouter />} />

        <Route element={<PrivateRoute />}>
          <Route path={`/${PatientsRoutes.patients}/*`} element={<PatientsRouter/>} />
        </Route>

        <Route path='*' element={<div>Page 404</div>} />
    </Routes>
  );
}
