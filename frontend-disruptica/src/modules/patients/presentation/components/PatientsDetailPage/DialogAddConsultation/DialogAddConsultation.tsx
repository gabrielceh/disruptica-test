import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePatientDetailsStore } from "@modules/patients/presentation/stores/patientDetailStore";
import { addConsultationSchema, type AddConsultationFormValues } from "@modules/patients/presentation/schemas";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorFormMessage } from "@/core/presentation/components";
import { useAddConsultationMutation } from "@modules/patients/presentation/hooks";
import { toast } from "sonner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

export function DialogAddConsultation() {
  const[open, setOpen] = useState(false);
  const patient = usePatientDetailsStore(state => state.patient);

  const mutation = useAddConsultationMutation()

  const {reset, handleSubmit, register, formState: { errors } } = useForm<AddConsultationFormValues>({
      resolver: zodResolver(addConsultationSchema),
    });

  useEffect(() => {
    if(!open){
      reset({
          reason:"",
          observations: "",
        })
    }
  }, [open])

  const onSubmit =  (data: AddConsultationFormValues) => {
     mutation.mutate({
      patientId: patient?.id ?? '',
      consultation: {
        date: new Date(),
        reason: data.reason,
        observations: data.observations,
      }
    },{
      onSuccess: () => {
        wait().then(()=>setOpen(false));
        toast("Event has been created", {
          description: "Consultation has been added",
        })
      },
      onError: (error) => {
        toast("Error adding consultation", {
          description: error.message,
        })
      }
    });
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button
          variant="outline">Add Consultation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Consultation</DialogTitle>
          </DialogHeader>

          <section className="grid gap-4 mt-8">
            <div className="grid gap-1">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason"  {...register("reason")}/>
              {errors.reason && <ErrorFormMessage message={errors.reason.message} />}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="observations">Observations</Label>
              <Textarea id="observations"  {...register("observations")}/>
              {errors.observations && <ErrorFormMessage message={errors.observations.message} />}
            </div>
          </section>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Consultation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
