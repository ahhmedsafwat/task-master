'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'

export default function ProfileSettingsPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="size-24">
              <AvatarImage />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="bg-primary text-primary-foreground hover:bg-primary/90 absolute bottom-0 right-0 cursor-pointer rounded-full p-2"
            >
              <Camera className="size-4" />
              <span className="sr-only">Upload avatar</span>
            </label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" disabled className="bg-muted" />
            <p className="text-muted-foreground text-sm">
              Email cannot be changed
            </p>
          </div>

          <Button type="submit" className="w-full">
            saving
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
