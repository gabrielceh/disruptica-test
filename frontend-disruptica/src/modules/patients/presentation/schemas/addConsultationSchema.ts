import z from "zod";

export const addConsultationSchema = z.object({
  reason: z
    .string()
    .min(1, { message: "Reason is required" })
    .max(50, { message: "Reason must have at most 50 characters" }),
  observations: z
    .string()
    .min(1, { message: "Observations is required" })
    .max(50, { message: "Observations must have at most 50 characters" }),
});

export type AddConsultationFormValues = z.infer<typeof addConsultationSchema>;