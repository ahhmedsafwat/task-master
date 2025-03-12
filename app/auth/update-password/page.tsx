import { UpdatePasswordComponet } from '@/components/auth/update-password-component'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Your Password</CardTitle>
        <CardDescription>
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdatePasswordComponet />
      </CardContent>
    </Card>
  )
}
