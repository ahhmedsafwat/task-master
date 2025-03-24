'use client'
import Link from 'next/link'
import { SubmitButton } from '@/components/ui/submit-button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect } from 'react'
import { AuthResponse } from '@/lib/types/types'
import { requestPasswordReset } from '@/lib/server/auth-actions'
import { toast } from 'sonner'

export const ForgetPasswordComponent = () => {
  const [state, ResetAction, isPending] = useActionState<
    AuthResponse,
    FormData
  >(requestPasswordReset, {
    message: '',
    status: 'idle',
  })

  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast.error(state.message)
    }
    if (state.status === 'success') {
      toast.success(state.message)
    }
  }, [state])

  return (
    <>
      <form action={ResetAction} className="space-y-3">
        <div>
          {' '}
          <Label className="mb-2" htmlFor="login-email">
            Email Address
          </Label>
          <Input
            id="login-email"
            name="email" // Ensure this matches the schema
            type="email"
            placeholder="m@example.com"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}

        <SubmitButton
          isPending={isPending}
          isSuccessful={state.status === 'success'}
        >
          Send Email
        </SubmitButton>
      </form>
      <div className="mt-4 flex items-center gap-1 text-xs">
        <span>Remember your password?</span>
        <Link href="/auth" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    </>
  )
}
