'use client'
import { LogOut } from 'lucide-react'

import { signOut } from '@/lib/server/auth-actions'
import { Button } from '../ui/button'

export const SignOut = () => {
  return (
    <Button
      onClick={async () => {
        await signOut()
      }}
      className="flex h-full w-full items-start justify-start gap-2"
      variant={'ghost'}
    >
      <>
        <LogOut className="text-destructive focus:text-destructive" />
        <span>Log out</span>
      </>
    </Button>
  )
}
