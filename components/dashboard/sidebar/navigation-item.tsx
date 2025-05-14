import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

// Create a more specific type for icons that can accept props like size and className

interface NavigationItemProps {
  href: string
  customIcon?: ReactNode
  title: string
  isActive?: boolean
  onClick?: () => void
}

export function NavigationItem({
  href,
  customIcon,
  title,
  isActive = false,
  onClick,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-secondary-foreground hover:bg-accent hover:text-primary-foreground flex items-center justify-between rounded-md px-2 py-1.5 transition-colors',
        {
          'bg-background text-primary-foreground font-semibold shadow':
            isActive,
        },
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={cn('mr-1.5', isActive ? 'opacity-100' : 'opacity-75')}>
          {customIcon}
        </div>
        <span className="text-sm">{title}</span>
      </div>
    </Link>
  )
}
