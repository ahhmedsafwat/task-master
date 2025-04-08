'use client'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function BreadCrumbs({ className }: { className?: string }) {
  const breadcrumbs = useBreadcrumbs()
  return (
    <nav aria-label="breadCrumbs" className={cn('block', className)}>
      <ol className="flex">
        {breadcrumbs.map(({ label, href, active }, index) => (
          <li
            aria-current={active}
            key={href}
            className={cn(
              'text-base capitalize md:text-xl',
              active ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500',
            )}
          >
            <Link href={href}>{label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1.5 inline-block text-xl">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
