'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DeleteProfile } from '@/lib/server/profile-actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

export const ProfileDelete = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)

  const handleDelete = async () => {
    try {
      await DeleteProfile({ userId: userId })
      toast.success('Profile deleted successfully')
      router.push('/auth')
    } catch (error) {
      console.error('Error deleting profile:', error)
      toast.error(`${error}`)
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <Image
            src="/images/delete.gif"
            width={300}
            height={300}
            alt="Delete action animation"
            className="h-full w-full object-cover"
            aria-label="Delete action animation"
            unoptimized
            quality={60}
          />
        </div>

        <DialogFooter className="sm:justify-start">
          <Button variant={'outline'} onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={async () => await handleDelete()}
            variant={'destructive'}
          >
            Yes, delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
