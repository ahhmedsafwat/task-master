'use client'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { signUp } from '@/lib/server/auth-actions'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AuthResponse } from '@/lib/types/types'
import { Eye, EyeOff } from 'lucide-react'

export const SignUpForm = ({}) => {
  const router = useRouter()
  const [signUpState, signUpAction, signUpPending] = useActionState<
    AuthResponse,
    FormData
  >(signUp, {
    status: 'idle',
    message: '',
    errors: {},
  })

  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (
      signUpState?.status === 'error' &&
      signUpState.message &&
      !signUpState.errors
    ) {
      toast.error(signUpState.message)
    }

    if (signUpState?.status === 'success') {
      toast.success(signUpState.message)

      if (signUpState.redirectTo) {
        router.push(signUpState.redirectTo)
      }
    }
  }, [signUpState, router])

  const handleAction = (formData: FormData) => {
    setEmail(formData.get('email') as string)
    signUpAction(formData)
  }

  return (
    <form action={handleAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="m@example.com"
          defaultValue={email}
        />
        {signUpState?.errors?.email && (
          <p className="text-sm text-red-500">{signUpState.errors.email[0]}</p>
        )}
      </div>

      <div>
        <div className="relative space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
          />
          <div className="absolute right-2 top-1/2 cursor-pointer">
            {showPassword ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
        </div>
        {signUpState?.errors?.password && (
          <p className="text-sm text-red-500">
            {signUpState.errors.password[0]}
          </p>
        )}
      </div>

      <SubmitButton
        isPending={signUpPending}
        isSuccessful={signUpState?.status === 'success'}
      >
        Sign Up
      </SubmitButton>
    </form>
  )
}
