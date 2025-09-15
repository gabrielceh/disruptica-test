import { useState } from "react";
import styles from "./login-form.module.css"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ErrorFormMessage } from "@/core/shared/components";
import { loginSchema, type LoginFormValues } from "@modules/auth/presentation/schemas";
import { useLoginMutation } from "@modules/auth/presentation/hooks";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) =>{
    setError(null);
    await loginMutation.mutate(data,{
      onError: (error) => {
        setError(error.message);
      },
      onSuccess: () => {
        setError(null);
        navigate('/home');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputContainer}>
        <Label htmlFor="email" className={styles.label}>Email</Label>
        <Input type="email" id="email" placeholder="Email" {...register("email", { required: true })} />
        {errors.email && <ErrorFormMessage message={errors.email.message} />}
      </div>
      
      <div className={styles.inputContainer}>
        <Label htmlFor="password" className={styles.label}>Password</Label>
        <Input type="password" id="password" placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <ErrorFormMessage message={errors.password.message} />}
      </div>

      <div>
        {error && <ErrorFormMessage message={error} />}
      </div>

      <div>
        <Button type="submit">{loginMutation.isPending ? "Signing in..." : "Login"}</Button>
      </div>
    </form>
  )
}
