import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "@core/shared/components";
import { MainLayout } from "@core/shared/layouts";
import { LoginPage } from "@/modules/auth/presentation/pages";

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Página inicial: Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
