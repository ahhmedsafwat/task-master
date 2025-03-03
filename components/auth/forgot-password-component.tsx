import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SubmitButton } from "../ui/submit-button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const ForgetPasswordComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Your Password?</CardTitle>
        <CardDescription>
          Enter your email address you used to register and we will send you a
          link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>Email Address</Label>
        <Input placeholder="Enter your email" />
      </CardContent>
      <CardContent>
        <SubmitButton isPending={false} isSuccessful={false}>
          Send Email
        </SubmitButton>
      </CardContent>
      <CardFooter className="justify-center gap-1 text-xs">
        <span>Remember your password?</span>
        <Link href="/auth" className="text-blue-500 underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};
