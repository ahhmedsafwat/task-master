import { ForgetPasswordComponent } from "@/components/auth/forgot-password-component";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Your Password?</CardTitle>
        <CardDescription>
          Enter your email address you used to register and we will send you a
          link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgetPasswordComponent />
      </CardContent>
    </Card>
  );
}
