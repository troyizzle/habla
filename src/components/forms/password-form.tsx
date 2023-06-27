import { zodResolver } from "@hookform/resolvers/zod";
import WizardStepForm from "../auth/wizard-step";
import { useSignUpForm } from "@/context/sign-up-provider";
import { Password, passwordSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function PasswordForm() {
  const { updateFormValues, next, stepsLength, formState, currentStepIndex } = useSignUpForm()

  const form = useForm<Password>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: formState.password
    }
  })

  async function onSubmit(data: Password) {
    updateFormValues(data)
    next()
  }

  return (
    <WizardStepForm<Password>
      form={form}
      onSubmit={onSubmit}
      stepNumber={currentStepIndex + 1}
      stepTitle="You'll need a password"
      stepsLength={stepsLength}
    >
      <Input
        type="password"
        {...form.register("password")}
      />
    </WizardStepForm>
  )
}
