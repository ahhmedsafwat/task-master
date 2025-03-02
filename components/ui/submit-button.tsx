import { LoaderIcon } from "lucide-react";
import { Button } from "./button";

export function SubmitButton({
  isPending,
  isSuccessful,
  children,
}: {
  isPending: boolean;
  isSuccessful: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Button
      type={isPending ? "button" : "submit"}
      disabled={isPending || isSuccessful}
      aria-disabled={isPending || isSuccessful}
      className="mt-5 h-11 w-full justify-center"
    >
      {isPending || isSuccessful ? <LoaderIcon /> : <>{children}</>}
      <output aria-live="polite" className="sr-only">
        {isPending || isSuccessful ? "Loading" : "submit form"}
      </output>
    </Button>
  );
}
