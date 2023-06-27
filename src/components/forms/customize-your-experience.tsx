import { useForm } from "react-hook-form";
import WizardStepForm from "../auth/wizard-step";
import { useSignUpForm } from "@/context/sign-up-provider";
import { Terms, termsSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { CloseButton } from "../close-button";

type CustomYourExperienceFormProps = {}

export default function CustomYourExperienceForm({ }: CustomYourExperienceFormProps) {
  const { formState, stepsLength, updateFormValues, next, back, currentStepIndex } = useSignUpForm()

  const form = useForm<Terms>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      terms: formState.terms
    }
  })

  function onSubmit(data: Terms) {
    updateFormValues(data)
    next()
  }

  return (
    <WizardStepForm
      form={form}
      stepsLength={stepsLength}
      stepTitle="Customize your experience"
      onSubmit={onSubmit}
      backButtonComponent={<CloseButton onClick={back} />}
      stepNumber={currentStepIndex + 1}
    >
      <div className="">
        Pleease accept!
      </div>
      <Input
        type="checkbox"
        {...form.register("terms")}
      />
    </WizardStepForm>
  )
}
