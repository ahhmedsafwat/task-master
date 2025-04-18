'use client'

import { usePathname } from 'next/navigation'

export const useBreadcrumbs = () => {
  const pathname = usePathname()
  const segments = pathname
    .slice(1)
    .split('/')
    .filter((filter) => filter !== 'dashboard')

  let currentPath = ''

  return segments.map((segment) => {
    currentPath += `/dashboard/${segment}`

    return {
      label: segment,
      href: currentPath,
      active: currentPath === pathname,
    }
  })
}
