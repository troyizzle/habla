"use client"

import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Auth, authSchema } from "@/lib/validations/auth"
import { useSignUpForm } from "@/context/sign-up-provider"
import WizardStepForm from "../auth/wizard-step"
import { CloseButton } from "../close-button"

type ConfirmUserFormProps = {}

export default function ConfirmUserForm({ }: ConfirmUserFormProps) {
  const { formState, stepsLength, currentStepIndex, next } = useSignUpForm()
  const { isLoaded, signUp } = useSignUp()

  const form = useForm<Auth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      ...formState
    }
  })

  async function onSubmit(data: Auth) {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: data.email
      })

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      })

      next()
    } catch (error) {
      const unknownError = "An unknown error occurred. Please try again later."

      isClerkAPIResponseError(error) ? toast.error(
        error.errors[0]?.longMessage ?? unknownError
      ) : toast.error(unknownError)
    }
  }

  return (
    <WizardStepForm
      stepsLength={stepsLength}
      form={form}
      onSubmit={onSubmit}
      backButtonComponent={<CloseButton />}
      stepNumber={currentStepIndex + 1}
      stepTitle="Confirm your account"
    >
      <Input
        className="py-6 px-2"
        type="text" placeholder="Name" {...form.register("name")} />
      <Input
        className="py-6 px-2"
        type="email" placeholder="Email" {...form.register("email")} />

      <div>
        <span className="text-white text-sm font-bold">Date of birth</span>
      </div>
      <div className="text-gray-500 text-xs">
        <span
        >This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</span>
      </div>
      <div>
        <Input type="date" placeholder="dob" {...form.register("dob")} />
      </div>
    </WizardStepForm>
  )
}
