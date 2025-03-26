'use client'
import { LogOut } from 'lucide-react'

import { signOut } from '@/lib/server/auth-actions'

export const SignOut = () => {
  return (
    <form
      action={async () => {
        await signOut()
      }}
      className="flex items-center gap-2"
    >
      <LogOut className="text-destructive focus:text-destructive" />
      <span>Log out</span>
    </form>
  )
}
