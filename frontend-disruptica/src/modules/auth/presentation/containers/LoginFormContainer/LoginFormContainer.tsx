import { LoginForm } from "../../components";
import styles from "./login-form-container.module.css"

export  function LoginFormContainer() {
  return (
    <div className={styles.container}>
      <LoginForm/>
    </div>
  )
}
