'use client'

import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { updateAvatar } from '@/lib/server/profile-actions'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

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

  // State for cropper
  const [image, setImage] = useState<string | null>(null)
  const [cropperOpen, setCropperOpen] = useState(false)
  const cropperRef = useRef<HTMLImageElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit')
      return
    }

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
    setCropperOpen(true)
  }

  const closeCropper = () => {
    setCropperOpen(false)
    // Clean up object URL
    if (image) {
      URL.revokeObjectURL(image)
      setImage(null)
    }
  }

  const cropAndUpload = async () => {
    if (!cropperRef.current || !image) return

    try {
      toast.loading('Processing image...')

      // Get cropper instance
      const cropper = (cropperRef.current as any).cropper

      // Get cropped canvas with specified dimensions
      const canvas = cropper.getCroppedCanvas({
        width: 320,
        height: 320,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      })

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob: Blob) => {
          resolve(blob as Blob)
        }, 'image/jpg') // Use webp for better compression
      })

      // Create a File from the blob
      const optimizedFile = new File([blob], 'avatar.jpg', {
        type: 'image/jpg',
      })

      // Upload the optimized file
      const data = await updateAvatar({
        file: optimizedFile,
        userId: id,
      })

      if (!data) {
        toast.error('Failed to update avatar')
        return
      }

      toast.dismiss()
      toast.success('Avatar updated successfully')
      closeCropper()
    } catch (error) {
      toast.error(`${error}`)
      toast.dismiss()
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative">
          <Avatar className="size-18 md:size-24">
            <AvatarImage
              src={avatarUrl ?? ''}
              alt={username || 'User avatar'}
              className="object-cover"
            />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
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

        <div>
          <h2 className="font-geist-mono text-2xl font-bold [word-spacing:-6px]">
            Your Avatar
          </h2>
          <p className="text-muted-foreground mt-2 text-xs md:text-sm">
            JPG, WEBP or PNG. Max 5MB.
          </p>
        </div>
      </div>

      {/* Image Cropper Dialog */}
      <Dialog
        open={cropperOpen}
        onOpenChange={(open) => !open && closeCropper()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Your Avatar</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {image && (
              <Cropper
                src={image}
                style={{ height: 300, width: '100%' }}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={false}
                viewMode={1}
                ref={cropperRef}
                dragMode="move"
                cropBoxMovable={true}
                cropBoxResizable={true}
                autoCropArea={1}
                highlight={false}
                background={false}
                responsive={true}
                checkOrientation={false}
              />
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeCropper}>
              Cancel
            </Button>
            <Button onClick={cropAndUpload}>Save Avatar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
