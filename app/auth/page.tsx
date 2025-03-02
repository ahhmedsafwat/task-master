"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { login, signUp } from "./actions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

// Submit buttons with pending state
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating account..." : "Create account"}
    </Button>
  );
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const AUTH_CALLBACK_URL = `${APP_URL}/auth/callback`;

  const [loginState, loginAction] = useActionState(login, {
    status: "error",
    message: "",
    errors: {},
  });

  const [signUpState, signUpAction] = useActionState(signUp, {
    status: "error",
    message: "",
    errors: {},
  });

  // Handle redirects after successful authentication
  useEffect(() => {
    if (loginState?.status === "success" && loginState?.redirectTo) {
      router.push(loginState.redirectTo);
    }
  }, [loginState, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Card>
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-6">
              <TabsContent value="login">
                <form action={loginAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {loginState?.errors?.email && (
                      <p className="text-sm text-red-500">
                        {loginState.errors.email[0]}
                      </p>
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
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      required
                    />
                    {loginState?.errors?.password && (
                      <p className="text-sm text-red-500">
                        {loginState.errors.password[0]}
                      </p>
                    )}
                  </div>

                  {loginState?.status === "error" && !loginState.errors && (
                    <Alert variant="destructive">
                      <AlertDescription>{loginState.message}</AlertDescription>
                    </Alert>
                  )}

                  {loginState?.status === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                      <AlertDescription className="text-green-800">
                        {loginState.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <LoginButton />
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form action={signUpAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {signUpState?.errors?.email && (
                      <p className="text-sm text-red-500">
                        {signUpState.errors.email[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      required
                    />
                    {signUpState?.errors?.password && (
                      <p className="text-sm text-red-500">
                        {signUpState.errors.password[0]}
                      </p>
                    )}
                  </div>

                  {signUpState?.status === "error" && !signUpState.errors && (
                    <Alert variant="destructive">
                      <AlertDescription>{signUpState.message}</AlertDescription>
                    </Alert>
                  )}

                  {signUpState?.status === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                      <AlertDescription className="text-green-800">
                        {signUpState.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <SignUpButton />
                </form>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex flex-col p-6 pt-0">
              <Separator className="my-4" />

              <div className="w-full space-y-3">
                <div className="w-full space-y-3">
                  <Button
                    variant="outline"
                    className="flex w-full items-center gap-2"
                    onClick={async () => {
                      const supabase = createClient();
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: "github",
                        options: {
                          redirectTo: AUTH_CALLBACK_URL,
                        },
                      });
                      if (error) router.push(`/auth?error=${error.message}`);
                    }}
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Continue with GitHub</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex w-full items-center gap-2"
                    onClick={async () => {
                      const supabase = createClient();
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: "google",
                        options: {
                          redirectTo: AUTH_CALLBACK_URL,
                          queryParams: {
                            access_type: "offline",
                            prompt: "consent",
                          },
                        },
                      });
                      if (error) router.push(`/auth?error=${error.message}`);
                    }}
                  >
                    {/* Google SVG remains the same */}
                    <span>Continue with Google</span>
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
