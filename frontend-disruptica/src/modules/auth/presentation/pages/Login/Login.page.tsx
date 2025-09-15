import { useAuthStore } from "@/core/stores/auth";
import { LoginFormContainer } from "../../containers";
import styles from "./login-page.module.css"
import { hasTokenExp } from "@/core/utils";
import { Navigate } from "react-router";
import { PatientsRoutes } from "@/modules/patients/router";

export  function LoginPage() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.setLogout);
  
  if (!token) {
    logout();
  }

  const isTokenExp = hasTokenExp(token);
  if (isTokenExp) {
    logout();
  }
    
  if(token) {
    return <Navigate to={`/${PatientsRoutes.patients}`} />;
  }

  

  return (
    <main className={styles.main}>
      <LoginFormContainer/>
    </main>
  )
}
