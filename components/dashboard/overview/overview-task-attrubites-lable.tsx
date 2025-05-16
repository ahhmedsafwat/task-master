import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export const AttrbuiteLable = ({
  label,
  icon,
  className,
}: {
  label: string
  icon: ReactNode
  className?: string
}) => {
  return (
    <Label
      htmlFor={label}
      className={cn(
        'text-secondary-foreground hover:bg-accent hover:text-foreground relative mr-2 flex w-36 items-center gap-1.5 text-nowrap rounded-md px-3 py-1.5 transition-colors',
        className,
      )}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </Label>
  )
}
