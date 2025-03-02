"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { SubmitButton } from "../ui/submit-button";
import { signUp } from "@/app/auth/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthResponse } from "@/lib/types/types";

export const SignUpForm = ({}) => {
  const router = useRouter();
  const [signUpState, signUpAction, signUpPending] = useActionState<
    AuthResponse,
    FormData
  >(signUp, {
    status: "idle",
    message: "",
    errors: {},
  });

  useEffect(() => {
    // Handle non-field validation errors with toast
    if (
      signUpState?.status === "error" &&
      signUpState.message &&
      !signUpState.errors
    ) {
      toast.error(signUpState.message);
    }

    // Handle successful signup with toast and redirect
    if (signUpState?.status === "success") {
      toast.success(signUpState.message);

      // Redirect if redirectTo is specified
      if (signUpState.redirectTo) {
        router.push(signUpState.redirectTo);
      }
    }
  }, [signUpState, router]);

  return (
    <form action={signUpAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="m@example.com"
        />
        {signUpState?.errors?.email && (
          <p className="text-sm text-red-500">{signUpState.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input id="signup-password" name="password" type="password" />
        {signUpState?.errors?.password && (
          <p className="text-sm text-red-500">
            {signUpState.errors.password[0]}
          </p>
        )}
      </div>

      <SubmitButton
        isPending={signUpPending}
        isSuccessful={signUpState?.status === "success"}
      >
        Sign Up
      </SubmitButton>
    </form>
  );
};
