import { NavigationItem } from './navigation-item'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Inbox,
  // BarChartBigIcon as ChartColumnBigIcon,
  LucideClipboardCheck,
} from 'lucide-react'
import { NavItem } from '@/lib/types/types'

// Navigation items definition
export const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard/overview',
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: 'Tasks',
    href: '/dashboard/my-tasks',
    icon: <LucideClipboardCheck size={18} />,
  },

  {
    title: 'Inbox',
    href: '/dashboard/notifications',
    icon: <Inbox size={18} />,
  },
]
interface SidebarNavigationProps {
  onItemClick?: () => void
}

export function SidebarNavigation({ onItemClick }: SidebarNavigationProps) {
  const pathname = usePathname()

  return (
    <>
      <div className="space-y-2 overflow-y-auto">
        <div className="text-muted-foreground text-xs">General</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavigationItem
              key={item.href}
              href={item.href}
              title={item.title}
              customIcon={item.icon}
              isActive={isActive}
              onClick={onItemClick}
            />
          )
        })}
      </div>
    </>
  )
}
