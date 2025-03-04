"use client";
import { updatePassword } from "@/app/auth/actions";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitButton } from "../ui/submit-button";
import { useActionState, useEffect } from "react";
import { AuthResponse } from "@/lib/types/types";
import { toast } from "sonner";

export const UpdatePasswordComponet = () => {
  const [state, action, isPending] = useActionState<AuthResponse, FormData>(
    updatePassword,
    { message: "", status: "idle" },
  );

  useEffect(() => {
    if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
    if (state.status === "success") {
      toast.success(state.message);
    }
  });

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input id="password" name="password" type="password" />
        {state?.errors?.password && (
          <p className="text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" />
        {state?.errors?.confirmPassword && (
          <p className="text-sm text-red-500">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <SubmitButton
        isPending={isPending}
        isSuccessful={state.status === "success"}
      >
        Update password
      </SubmitButton>
    </form>
  );
};
