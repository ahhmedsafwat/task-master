'use client'
import React, { useState } from 'react'
import { updateUsername } from '@/lib/server/profile-actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ProfileFormProps {
  userId: string
  email: string
  username: string | null
}

export function ProfileForm({ userId, email, username }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      setIsLoading(true)

      const formData = new FormData(event.currentTarget)
      const name = formData.get('name') as string

      const { message, status } = await updateUsername({
        userId: userId,
        username: name,
      })

      if (status === 'error') {
        toast.error(message)
        return
      }

      toast.success(message)
    } catch (error) {
      toast.error(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={username ?? email.split('@')[0]}
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
