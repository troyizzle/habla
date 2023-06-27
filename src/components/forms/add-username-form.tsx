import { useSignUpForm } from "@/context/sign-up-provider";
import { Username, usernameSchema } from "@/lib/validations/auth";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import WizardStepForm from "../auth/wizard-step";
import { Input } from "../ui/input";

export default function AddUsernameForm() {
  const { stepsLength, formState, currentStepIndex } = useSignUpForm()
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const form = useForm<Username>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: formState.username
    }
  })

  async function onSubmit(data: Username) {
    if (!isLoaded) return

    const completeSignUp = await signUp.update({
      username: data.username,
      password: formState.password
    })

    if (completeSignUp.status != "complete") {
      console.log(JSON.stringify(completeSignUp), null, 2)
    }

    if (completeSignUp.status == "complete") {
      await setActive({
        session: completeSignUp.createdSessionId
      })
      router.push("/")
      toast.success("Welcome to Habla!")
    }
  }

  return (
    <WizardStepForm
      form={form}
      onSubmit={onSubmit}
      stepNumber={currentStepIndex + 1}
      stepTitle="Pick a username"
      stepsLength={stepsLength}
    >
      <Input
        type="text"
        {...form.register("username")}
      />
    </WizardStepForm>
  )
}
