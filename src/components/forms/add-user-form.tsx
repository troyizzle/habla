import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Auth, authSchema } from "@/lib/validations/auth"
import { useSignUpForm } from "@/context/sign-up-provider"
import WizardStepForm from "../auth/wizard-step"
import debounce from 'debounce'
import { ChangeEvent } from "react"
import axios from "axios"
import { UserValidateEmail } from "@/app/api/v1/users/validate-email/route"
import clsx from "clsx"
import HomeBackButton from "../home-back-button"

type AddUserFormProps = {}

export default function AddUserForm({ }: AddUserFormProps) {
  const { stepsLength, formState, updateFormValues, next, currentStepIndex } = useSignUpForm()

  const form = useForm<Auth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      ...formState
    }
  })

  function onSubmit(data: Auth) {
    updateFormValues(data)
    next()
  }

  async function validateEmail(email: string) {
    try {
      const resp = await axios.get("/api/v1/users/validate-email", {
        params: {
          email
        }
      })

      const data: UserValidateEmail = resp.data
      if (data.taken) {
        form.setError("email", {
          type: 'custom',
          message: 'Email is already taken'
        })
      } else {
        form.clearErrors("email")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <WizardStepForm
      form={form}
      onSubmit={onSubmit}
      backButtonComponent={<HomeBackButton />}
      stepNumber={currentStepIndex + 1}
      stepTitle="Create your account"
      stepsLength={stepsLength}
    >
      <Input
        className="py-6 px-2"
        type="text" placeholder="Name" {...form.register("name")} />
      <div>
        <Input
          className={clsx("py-6 px-2", {
            "border-red-500": form.formState.errors.email
          })}
          type="email" placeholder="Email"
          {...form.register("email")}
          onChange={debounce((event: ChangeEvent<HTMLInputElement>) => validateEmail(event.target.value), 500)}
        />
        {form.formState.errors.email && (
          <div className="text-red-500 text-xs">
            {form.formState.errors.email.message}
          </div>
        )}
      </div>

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
    </WizardStepForm >
  )
}

