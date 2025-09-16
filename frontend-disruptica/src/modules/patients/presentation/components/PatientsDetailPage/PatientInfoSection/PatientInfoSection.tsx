import { Controller, useForm } from "react-hook-form";
import { Gender, Roles } from "@/core/domain/entities";
import { genderToString } from "@/core/utils";
import { patientSchema, type PatientFormValues } from "@modules/patients/presentation/schemas/patientSchema";
import { useAuthStore } from "@/core/stores/auth";
import { useEffect } from "react";
import { usePatientDetailsStore } from "@modules/patients/presentation/stores/patientDetailStore";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/core/presentation/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export function PatientInfoSection() {
  const patient = usePatientDetailsStore(state => state.patient);
  const user = useAuthStore(state => state.user);


  const {reset, control, handleSubmit, register, formState: { errors } } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
  });


  useEffect(() => {
    reset({
      name: patient?.name ?? "",
      lastName: patient?.lastName ?? "",
      dateOfBirth: (patient?.dateOfBirth) instanceof Date ? patient?.dateOfBirth : new Date(),
      gender: patient?.gender ?? Gender.O ,
    });
  }, [patient, reset]);




  const onSubmit = (data: PatientFormValues) => {
    console.log("✅ Form data:", data);
  };

  return (
     <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
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

        <section>
          <div>
            <Label>Date of birth</Label>
            <Controller
              control={control}
              name="dateOfBirth"
              disabled={user.role === Roles.user}
              render={({ field }) => (
                <DatePicker
                  value={field.value || null}
                  onChange={(date) => field.onChange(date ?? undefined)}
                />
              )}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
          </div>

          <div>
            <Label>Gender</Label>
            <Controller
              control={control}
              name="gender"
              disabled={user.role === Roles.user}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
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
        user.role === Roles.admin && <Button type="submit" >
            Save
          </Button>
        }
      </form>
    </div>
  )
}
