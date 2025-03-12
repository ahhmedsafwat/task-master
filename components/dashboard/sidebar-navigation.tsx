import { NavigationItem } from './navigation-item'
import { usePathname } from 'next/navigation'
import type { NavItem } from './sidebar-data'

interface SidebarNavigationProps {
  navItems: NavItem[]
  onItemClick?: () => void
}

export function SidebarNavigation({
  navItems,
  onItemClick,
}: SidebarNavigationProps) {
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
              icon={item.icon}
              isActive={isActive}
              onClick={onItemClick}
            />
          )
        })}
      </div>
    </>
  )
}
