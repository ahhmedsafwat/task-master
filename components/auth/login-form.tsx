'use client'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { login } from '@/lib/server/auth-actions'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AuthResponse } from '@/lib/types/types'
import { Eye, EyeOff } from 'lucide-react'

export const LoginForm = () => {
  const router = useRouter()
  const [loginState, loginAction, loginPending] = useActionState<
    AuthResponse,
    FormData
  >(login, {
    status: 'idle',
    message: '',
    errors: {},
  })

  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (
      loginState?.status === 'error' &&
      loginState.message &&
      !loginState.errors
    ) {
      toast.error(loginState.message)
    }

    if (loginState?.status === 'success') {
      toast.success(loginState.message)

      if (loginState.redirectTo) {
        router.push(loginState.redirectTo)
      }
    }
  }, [loginState, router])

  const handleAction = (formData: FormData) => {
    setEmail(formData.get('email') as string)
    loginAction(formData)
  }

  return (
    <form action={handleAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder="m@example.com"
          defaultValue={email}
        />
        {loginState?.errors?.email && (
          <p className="text-sm text-red-500">{loginState.errors.email[0]}</p>
        )}
      </div>
      <div>
        <div className="relative space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
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
        {loginState?.errors?.password && (
          <p className="text-sm text-red-500">
            {loginState.errors.password[0]}
          </p>
        )}
      </div>

      <SubmitButton
        isPending={loginPending}
        isSuccessful={loginState?.status === 'success'}
        className="mb-2 mt-2"
      >
        Login
      </SubmitButton>
      <div className="flex w-full items-center justify-end">
        <a
          href="/auth/forgot-password"
          className="text-xs text-blue-600 hover:underline"
        >
          Forgot password?
        </a>
      </div>
    </form>
  )
}
