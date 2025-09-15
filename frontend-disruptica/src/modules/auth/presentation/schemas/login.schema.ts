
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .trim()
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long"  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
