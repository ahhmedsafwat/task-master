'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useState } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import { updateAvatar } from '@/lib/server/profile-actions'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProfileAvatarProps {
  avatarUrl: string | null
  username: string | null
  id: string
}

export const ProfileAvatar = ({
  avatarUrl,
  username,
  id,
}: ProfileAvatarProps) => {
  // Get initials for avatar fallback
  const initials = username ? username.substring(0, 2).toUpperCase() : 'U'
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return

    // Validate file size (5MB limit recommended)
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (event.target.files[0].size > MAX_SIZE) {
      toast.error('File size exceeds 5MB limit')
      return
    }

    const file = event.target.files[0]
    setSelectedFile(file)
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(preview as string)
  }

  const uploadAvatar = async () => {
    try {
      setIsLoading(true)
      toast.loading('Uploading avatar...')
      const data = await updateAvatar({
        file: selectedFile as File,
        userId: id,
      })

      setPreview(null)
      if (!data) {
        toast.error('Failed to update avatar')
        return
      }
      toast.dismiss()
      toast.success('Avatar updated successfully')
    } catch (error) {
      toast.error(`Failed to update avatar : ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4 md:gap-6">
      {preview ? (
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Avatar className="size-18 md:size-24">
              <AvatarImage
                src={preview}
                alt={username || 'User avatar'}
                className="object-cover"
              />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              aria-label="Upload avatar"
            />
            <Label
              htmlFor="avatar-upload"
              className="bg-primary text-primary-foreground hover:bg-primary/90 absolute bottom-0 right-0 cursor-pointer rounded-full p-2"
              tabIndex={0}
              aria-label="Upload avatar"
              role="button"
            >
              <Camera className="size-3 md:size-4" />
              <span className="sr-only">Upload avatar</span>
            </Label>
          </div>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => setPreview(null)}
            size={'sm'}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Avatar className="size-18 md:size-24">
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt={username || 'User avatar'}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            aria-label="Upload avatar"
          />
          <Label
            htmlFor="avatar-upload"
            className="bg-primary text-primary-foreground hover:bg-primary/90 absolute bottom-0 right-0 cursor-pointer rounded-full p-2"
            tabIndex={0}
            aria-label="Upload avatar"
            role="button"
          >
            <Camera className="size-3 md:size-4" />
            <span className="sr-only">Upload avatar</span>
          </Label>
        </div>
      )}
      <div>
        <Button
          variant="outline"
          disabled={isLoading || !preview}
          onClick={uploadAvatar}
          className="relative"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Change Avatar'
          )}
        </Button>
        <p className="text-muted-foreground mt-2 text-xs md:text-sm">
          JPG,WEBP or PNG Max 5MB.
        </p>
      </div>
    </div>
  )
}
