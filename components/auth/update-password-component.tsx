import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitButton } from "../ui/submit-button";

export const UpdatePasswordComponet = () => {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" />
      </div>

      <SubmitButton isPending={false} isSuccessful={false}>
        Update password
      </SubmitButton>
    </form>
  );
};
