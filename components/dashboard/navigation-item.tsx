import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ElementType } from 'react'

interface NavigationItemProps {
  href: string
  icon?: ElementType
  title: string
  isActive?: boolean
  onClick?: () => void
}

export function NavigationItem({
  href,
  icon: Icon,
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
          'bg-accent text-primary-foreground': isActive,
        },
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {Icon && (
          <Icon
            size={16}
            className={cn('mr-2', isActive ? 'opacity-100' : 'opacity-80')}
          />
        )}
        <span className="text-sm">{title}</span>
      </div>
    </Link>
  )
}
