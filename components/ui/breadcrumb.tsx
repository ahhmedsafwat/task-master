'use client'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { navItems } from '../dashboard/sidebar/sidebar-navigation'

export default function BreadCrumbs({ className }: { className?: string }) {
  const breadcrumbs = useBreadcrumbs({ links: navItems })
  return (
    <nav aria-label="breadCrumbs" className={cn('block', className)}>
      <ol className="flex">
        {breadcrumbs.map(({ label, href, active }, index) => (
          <li
            aria-current={active}
            key={href}
            className={cn(
              'text-base md:text-xl',
              active ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500',
            )}
          >
            <Link href={href}>{label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block text-sm">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
