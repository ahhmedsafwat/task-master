'use client'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { GithubIcon } from 'lucide-react'
import { toast } from 'sonner'

export const SigningWithGithub = () => {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const AUTH_CALLBACK_URL = `${APP_URL}/auth/callback`

  const handleSignIn = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: AUTH_CALLBACK_URL,
        },
      })

      if (error) {
        toast.error(error.message)
      }
    } catch {
      toast.error('Failed to sign in with GitHub')
    }
  }

  return (
    <Button
      variant="outline"
      className="flex w-full items-center gap-2"
      onClick={handleSignIn}
    >
      <GithubIcon className="h-4 w-4" />
      <span>Continue with GitHub</span>
    </Button>
  )
}
