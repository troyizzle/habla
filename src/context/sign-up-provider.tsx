"use client"

import AddUserForm from "@/components/forms/add-user-form"
import AddUsernameForm from "@/components/forms/add-username-form"
import ConfirmUserForm from "@/components/forms/confirm-user-form"
import CustomYourExperienceForm from "@/components/forms/customize-your-experience"
import PasswordForm from "@/components/forms/password-form"
import VerifyEmailForm from "@/components/forms/verify-email-form"
import { useMultistepForm } from "@/hooks/useMultistepForm"
import { Auth, Password, Terms, Username } from "@/lib/validations/auth"
import { createContext, useContext, useState } from "react"

type SignUpContext = {
  formState: CompleteSignUp
  updateFormValues: (fields: Partial<CompleteSignUp>) => void
  form: JSX.Element | undefined
  next: () => void
  back: () => void
  currentStepIndex: number
  stepsLength: number
}

type CompleteSignUp = Auth & Terms & Password & Username

const INITIAL_DATA: CompleteSignUp = {
  name: "",
  email: "",
  dob: "",
  terms: false,
  password: "",
  username: ""
}

export const SignUpContext = createContext({} as SignUpContext)

export function useSignUpForm() {
  return useContext(SignUpContext)
}

type SignUpProviderProps = {
  children: React.ReactNode
}

export default function SignUpProvider({ children }: SignUpProviderProps) {
  const [formState, setFormState] = useState<CompleteSignUp>(INITIAL_DATA)
  const { steps, currentStepIndex, step: form, back, next } =
    useMultistepForm([
      <AddUserForm key="AddUserForm" />,
      <CustomYourExperienceForm key="Custom" />,
      <ConfirmUserForm key="Confirm" />,
      <VerifyEmailForm key="Verify" />,
      <PasswordForm key="Password" />,
      <AddUsernameForm key="Username" />
    ])

  const updateFormValues = (fields: Partial<CompleteSignUp>) => {
    setFormState({
      ...formState,
      ...fields
    })
  }

  const stepsLength = steps.length

  return (
    <SignUpContext.Provider value={{ stepsLength, form, back, currentStepIndex, formState, updateFormValues, next }}>
      {children}
    </SignUpContext.Provider>
  )
}
