import { TabsContent } from '@radix-ui/react-tabs'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoginForm } from './login-form'
import { SignUpForm } from './signup-form'
import { SigningWithGithub } from './github-auth'
import { SigningWithGoogle } from './google-auth'
import { Separator } from '@/components/ui/separator'

export const AuthCard = () => {
  return (
    <Card>
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </CardContent>
        <CardContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </CardContent>
        <CardContent>
          <div className="flex items-center justify-between gap-3">
            <Separator className="shrink" />
            <span>or</span>
            <Separator className="shrink" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <SigningWithGithub />
          <SigningWithGoogle />
        </CardFooter>
      </Tabs>
    </Card>
  )
}
