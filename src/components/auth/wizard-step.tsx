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
    <form onSubmit={form.handleSubmit(onSubmit)}
    style={{
      minHeight: "100svh"
    }}
    className="flex flex-col">
      <div
        className="h-4/5 p-4"
        style={{
          flex: "1 0 75%"
        }}>
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
      <div
      className="w-full p-4"
      style={{
        flex: "0 0 20%",
        minHeight: "50px",
      }}>
        <Button
        className="w-full"
        disabled={form.formState.isSubmitting || !form.formState.isValid} type="submit" variant="default" size="lg">
          {stepNumber === stepsLength ? "Finish" : "Next"}
        </Button>
      </div>
    </form>
  );
};

