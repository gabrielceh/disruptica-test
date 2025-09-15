
import { Route, Routes } from "react-router";
import { MainLayout } from "@core/shared/layouts";
import { AuthRoutes, AuthRouter } from "@/modules/auth/router";
import { RootPage } from "./RootPage";

export function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<RootPage/>} />
        <Route path={`${AuthRoutes.auth}/*`} element={<AuthRouter />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<h1>Dashboard</h1>} />
        </Route>

        <Route path='*' element={<div>Page 404</div>} />
    </Routes>
  );
}
