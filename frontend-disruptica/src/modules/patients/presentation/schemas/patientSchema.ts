import { Gender } from "@/core/domain/entities";
import { z } from "zod";

export const patientSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must have at most 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must have at most 50 characters" }),
  birthDate:  z.date().transform((value) => new Date(value))
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" })
    .refine((date) => date <= new Date(), { message: "Date cannot be in the future" }),
  gender: z.enum([Gender.F, Gender.M, Gender.O],{
    message: "Gender must be one of the following: Female, Male, Other",
  }),
});

// Tipado automático de TypeScript
export type PatientFormValues = z.infer<typeof patientSchema>;
