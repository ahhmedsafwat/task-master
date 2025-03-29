'use client'
import { NavItem } from '@/lib/types/types'
import { usePathname } from 'next/navigation'

export const useBreadcrumbs = ({ links }: { links: NavItem[] }) => {
  const pathname = usePathname()
  const segments = pathname.slice(1).split('/dashboard')
  let currentPath = ''

  return segments.map((segment) => {
    currentPath += `/${segment}`
    const matchedLink = links.find((link) => link.href === currentPath)

    if (matchedLink) {
      return {
        label: matchedLink.title,
        href: matchedLink.href,
        active: currentPath === pathname,
      }
    }

    return {
      label: segment,
      href: currentPath,
      active: currentPath === pathname,
    }
  })
}
