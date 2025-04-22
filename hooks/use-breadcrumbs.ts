'use client'

import { usePathname } from 'next/navigation'

export const useBreadcrumbs = () => {
  const pathname = usePathname()
  const segments = pathname
    .slice(1)
    .split('/')
    .filter((filter) => filter !== 'dashboard')

  let currentPath = '/dashboard'

  return segments.map((segment) => {
    currentPath += `/${segment}`

    return {
      label: segment,
      href: currentPath,
      active: currentPath === pathname,
    }
  })
}
