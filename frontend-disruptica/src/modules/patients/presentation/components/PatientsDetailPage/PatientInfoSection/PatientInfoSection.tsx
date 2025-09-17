import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./patient-info-section.module.css"
import { Gender, Roles } from "@/core/domain/entities";
import { genderToString } from "@/core/utils";
import { patientSchema, type PatientFormValues } from "@modules/patients/presentation/schemas/patientSchema";
import { useAuthStore } from "@/core/stores/auth";
import { usePatientDetailsStore } from "@modules/patients/presentation/stores/patientDetailStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePatientMutation } from "@modules/patients/presentation/hooks";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/core/presentation/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";


export function PatientInfoSection() {
  const patient = usePatientDetailsStore(state => state.patient);
  const user = useAuthStore(state => state.user);
  const mutation = useUpdatePatientMutation()

  const {reset, control, handleSubmit, register, formState: { errors } } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
  });


  useEffect(() => {
    reset({
      name: patient?.name ?? "",
      lastName: patient?.lastName ?? "",
      birthDate: patient?.birthDate ? new Date(patient?.birthDate) : new Date(),
      gender: patient?.gender ?? Gender.O ,
    });
  }, [patient, reset]);




  const onSubmit = async (data: PatientFormValues) => {
    await mutation.mutate({
      ...data,
      birthDate: data.birthDate,
      id: patient?.id ?? '',
      isActive: patient?.isActive ?? false,
      consultations: patient?.consultations ?? [],
    },{
      onSuccess: () => {
        toast("Event has been created", {
          description: "Patient has been updated",
        })
      },
      onError: (error) => {
        toast("Error updating patient", {
          description: error.message,
        })
      }
    });

  };

  return (
     <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <section className={styles.formSection}>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Name"
              disabled={user.role === Roles.user}
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Last name</Label>
            <Input
              type="text"
              placeholder="Last name"
              disabled={user.role === Roles.user}
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </section>

        <section className={styles.formSection}>
          <div>
            <Label>Date of birth</Label>
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                  <DatePicker
                  isDisabled={user.role === Roles.user}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date ?? undefined)}
                />
              )}
            />
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
          </div>

          <div>
            <Label>Gender</Label>
            <Controller
              control={control}
              name="gender"
              
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={user.role === Roles.user}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.M}>{genderToString(Gender.M)}</SelectItem>
                    <SelectItem value={Gender.F}>{genderToString(Gender.F)}</SelectItem>
                    <SelectItem value={Gender.O}>{genderToString(Gender.O)}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
        </section>

       {
        user.role === Roles.admin && 
        <div className={styles.btnContainer}>
          <Button type="submit" disabled={mutation.isPending}>
            Save
          </Button>
        </div>
        }
      </form>
    </div>
  )
}
