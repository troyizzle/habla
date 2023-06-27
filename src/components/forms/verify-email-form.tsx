"use client"

import { VerifyEmail, verifyEmailSchema } from "@/lib/validations/auth"
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "../ui/input"
import WizardStepForm from "../auth/wizard-step"
import { useSignUpForm } from "@/context/sign-up-provider"
import { CloseButton } from "../close-button"

type VerifyEmailFormProps = {}

export default function VerifyEmailForm({ }: VerifyEmailFormProps) {
  const { isLoaded, signUp } = useSignUp()
  const { next, currentStepIndex, stepsLength } = useSignUpForm()

  const form = useForm<VerifyEmail>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: ""
    }
  })

  async function onSubmit(data: VerifyEmail) {
    if (!isLoaded) return;

    try {
      await signUp.attemptEmailAddressVerification({
        code: data.code
      })

      next()
    } catch (error) {
      const unknownError = "An unknown error occurred. Please try again later."

      isClerkAPIResponseError(error) ? toast.error(error.errors[0]?.longMessage ?? unknownError) : toast.error(unknownError)
    }
  }

  return (
    <WizardStepForm
      stepsLength={stepsLength}
      form={form}
      onSubmit={onSubmit}
      backButtonComponent={<CloseButton />}
      stepNumber={currentStepIndex + 1}
      stepTitle="We sent you a code"
    >
      <Input type="text" placeholder="code" {...form.register("code")} />
    </WizardStepForm>
  )
}
