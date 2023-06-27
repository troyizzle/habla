import { Button } from "../ui/button";
import { FieldValues, UseFormReturn } from "react-hook-form";

type WizardStepFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (arg0: T) => void;
  backButtonComponent?: React.ReactNode;
  stepNumber: number;
  stepTitle: string;
  children: React.ReactNode;
  stepsLength: number;
}

export default function WizardStepForm<T extends FieldValues>({
  form,
  onSubmit,
  backButtonComponent,
  stepNumber,
  stepTitle,
  children,
  stepsLength,
}: WizardStepFormProps<T>) {
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex min-h-[87vh]">
          <div className="flex flex-col grow">
            <div className="flex items-center">
              {/* Render the back button component */}
              {backButtonComponent && backButtonComponent}
              <div className="ml-4">
                Step {stepNumber} of {stepsLength}
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <h1 className="text-2xl font-bold">{stepTitle}</h1>
              {/* Render the form inputs */}
              {children}
            </div>
          </div>
        </div>
        <Button disabled={form.formState.isSubmitting || !form.formState.isValid} type="submit" variant="default">
          {stepNumber === stepsLength ? "Finish" : "Next"}
        </Button>
      </form>
    </div>
  );
};
