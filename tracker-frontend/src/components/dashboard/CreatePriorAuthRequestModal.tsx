import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PriorAuthInputType } from "@/types/priorAuth.types";
import { usePostMutationCreatePriorAuthRequest } from "@/hooks/api-hooks/usePriorAuthQuery";
import { Loader2Icon } from "lucide-react";
import { PatientType } from "@/types/patient.types";

export default function CreatePriorAuthRequestModal({
  patient,
}: {
  patient: PatientType;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PriorAuthInputType>();
  const {
    mutate: createPriorAuthRequest,
    isLoading
  } = usePostMutationCreatePriorAuthRequest();

  const onFormSubmit = (data: PriorAuthInputType) => {
    createPriorAuthRequest(
      { requestData: data, patientId: patient._id },
      {
        onSuccess: () => {
          reset();
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button size="default" className="font-bold w-64">
          Create Prior Authorization Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-y-auto">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Prior Authorization Request Form</DialogTitle>
            <DialogDescription>
              Create a request for the patient
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="font-bold border-b">Patient Details:</div>
            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Enter name"
                value={patient.name}
                onFocus={(e) =>
                  e.target.setSelectionRange(
                    patient.name.length,
                    patient.name.length
                  )
                }
                {...register("patientName", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Name must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.patientName && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.patientName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="condition" className="text-right">
                Condition
              </Label>
              <Input
                placeholder="Enter Condition"
                value={patient.condition}
                {...register("condition", {
                  required: {
                    value: true,
                    message: "Condition is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Condition must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Patient Name must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.condition && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.condition.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="treatmentPlan" className="text-right">
                Treatment Plan
              </Label>
              <Input
                placeholder="Enter Treatment Plan"
                value={patient.treatmentPlan}
                {...register("treatmentPlan", {
                  required: {
                    value: true,
                    message: "Treatment Plan is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Treatment Plan must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Treatment Plan must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.treatmentPlan && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.treatmentPlan.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="diagnosisCode" className="text-right">
                Diagnosis Code
              </Label>
              <Input
                placeholder="Enter Diagnosis Code"
                value={patient.diagnosisCode}
                {...register("diagnosisCode", {
                  required: {
                    value: true,
                    message: "Diagnosis Code is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Diagnosis Code must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Diagnosis Code must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.diagnosisCode && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.diagnosisCode.message}
                </p>
              )}
            </div>
            <div className="mt-3 font-bold border-b">Insurance Plan</div>
            <div>
              <Label htmlFor="provider" className="text-right">
                provider
              </Label>
              <Input
                placeholder="Enter Provider"
                value={patient.insurancePlan.provider}
                {...register("insurancePlan.provider", {
                  required: {
                    value: true,
                    message: "Provider is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Provider must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Provider must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.insurancePlan?.provider && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.insurancePlan.provider.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="policyNumber" className="text-right">
                Policy Number
              </Label>
              <Input
                placeholder="Enter Policy Number"
                value={patient.insurancePlan.policyNumber}
                {...register("insurancePlan.policyNumber", {
                  required: {
                    value: true,
                    message: "Policy Number is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Policy Number must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Policy Number must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.insurancePlan?.policyNumber && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.insurancePlan.policyNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="name" className="text-right">
                Group Number
              </Label>
              <Input
                placeholder="Enter Group Number"
                value={patient.insurancePlan.groupNumber}
                {...register("insurancePlan.groupNumber", {
                  required: {
                    value: true,
                    message: "Group Number is required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Group Number must be less than 100 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Group Number must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              {errors.insurancePlan?.groupNumber && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.insurancePlan.groupNumber.message}
                </p>
              )}
            </div>
            <div className="mt-3 font-bold broder-b">Other Details:</div>
            <div>
              <Label htmlFor="dateOfService" className="text-right">
                Date Of Service
              </Label>
              <Input
                type="date"
                placeholder="DD-MM-YYYY"
                {...register("dateOfService", {
                  required: {
                    value: true,
                    message: "Date Of Service is required",
                  },
                })}
                className="col-span-3"
              />
              {errors.dateOfService && (
                <p className="text-xs mt-0.5 text-red-600">
                  {" "}
                  {errors.dateOfService.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="doctorNotes" className="text-right">
                Doctor Notes{" "}
                {<span className="text-muted-foreground">Optional</span>}
              </Label>
              <Input type="text" placeholder="Enter Doctor Notes" {...register("doctorNotes")} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              Create Request
              {isLoading && <Loader2Icon className=" animate-spin " />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
