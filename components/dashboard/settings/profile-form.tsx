// profile-form.jsx
'use client'

import React, { useState } from 'react'
import { updateUsername } from '@/lib/server/profile-actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  userId: string
  email: string
  username: string | null
}

export default function ProfileForm({
  userId,
  email,
  username,
}: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleFormSubmit = async (fromData: FormData) => {
    try {
      setIsLoading(true)

      const name = fromData.get('name') as string
      const result = await updateUsername({
        userId: userId,
        username: name,
      })

      if (!result) {
        toast.error('Failed to update username')
        return
      }

      toast.success('Username updated successfully')
      router.refresh()
    } catch (error) {
      toast.error(`Failed to update username : ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-4" action={handleFormSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={username ?? ''}
          className="bg-white/5"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>{' '}
        <p className="text-muted-foreground text-sm">
          Your email address cannot be changed.
        </p>
        <Input id="email" value={email} disabled className="bg-white/5" />
      </div>

      <Button disabled={isLoading} type="submit" className="w-full md:w-auto">
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}
