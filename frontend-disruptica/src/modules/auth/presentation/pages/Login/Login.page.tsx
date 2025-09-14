import { LoginFormContainer } from "../../containers";
import styles from "./login-page.module.css"

export  function LoginPage() {
  return (
    <main className={styles.main}>
      <LoginFormContainer/>
    </main>
  )
}
