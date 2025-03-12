import { LoaderIcon } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

export function SubmitButton({
  isPending,
  isSuccessful,
  children,
  className,
}: {
  isPending: boolean
  isSuccessful: boolean
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Button
      type={isPending ? 'button' : 'submit'}
      disabled={isPending || isSuccessful}
      aria-disabled={isPending || isSuccessful}
      className={cn(`h-11 w-full cursor-pointer justify-center`, className)}
      variant={'inverted'}
    >
      {isPending || isSuccessful ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <>{children}</>
      )}
      <output aria-live="polite" className="sr-only">
        {isPending || isSuccessful ? 'Loading' : 'submit form'}
      </output>
    </Button>
  )
}
