import { cn } from '@/lib/utils'
import Link from 'next/link'

interface breadcrumbs {
  label: string
  href: string
  active?: boolean
}

export default function BreadCrumbs({
  breadcrumbs,
  className,
}: {
  breadcrumbs: breadcrumbs[]
  className?: string
}) {
  return (
    <nav aria-label="breadCrumbs" className={cn('hidden lg:block', className)}>
      <ol className="flex">
        {breadcrumbs.map(({ label, href, active }, index) => (
          <li
            aria-current={active}
            key={href}
            className={cn(
              active ? 'text-gray-900 dark:text-gray-300' : 'text-gray-500',
            )}
          >
            <Link href={href}>{label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
