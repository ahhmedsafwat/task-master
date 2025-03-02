"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { SubmitButton } from "../ui/submit-button";
import { login } from "@/app/auth/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthResponse } from "@/lib/types/types";

export const LoginForm = () => {
  const router = useRouter();
  const [loginState, loginAction, loginPending] = useActionState<
    AuthResponse,
    FormData
  >(login, {
    status: "idle",
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (
      loginState?.status === "error" &&
      loginState.message &&
      !loginState.errors
    ) {
      toast.error(loginState.message);
    }

    if (loginState?.status === "success") {
      toast.success(loginState.message);

      if (loginState.redirectTo) {
        router.push(loginState.redirectTo);
      }
    }
  }, [loginState, router]);

  return (
    <form action={loginAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder="m@example.com"
        />
        {loginState?.errors?.email && (
          <p className="text-sm text-red-500">{loginState.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <a
            href="/auth/forgot-password"
            className="text-xs text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Input id="login-password" name="password" type="password" />
        {loginState?.errors?.password && (
          <p className="text-sm text-red-500">
            {loginState.errors.password[0]}
          </p>
        )}
      </div>

      <SubmitButton
        isPending={loginPending}
        isSuccessful={loginState?.status === "success"}
      >
        Login
      </SubmitButton>
    </form>
  );
};
