import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "@core/shared/components";
import { MainLayout } from "@core/shared/layouts";

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Página inicial: Login */}
        <Route path="/" element={<h1>Login</h1>} />

        {/* Rutas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
