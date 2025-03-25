import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'

interface SidebarHeaderProps {
  isPinned: boolean
  togglePin: () => void
  isMobile: boolean
}

export function SidebarHeader({
  isPinned,
  togglePin,
  isMobile,
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg px-1">
      <Logo
        href={'/dashboard/overview'}
        textClassName="sm:text-sm"
        svgSize={28}
      />

      {/* Toggle button */}
      <Button
        aria-label={
          isMobile ? 'Close menu' : isPinned ? 'Unpin sidebar' : 'Pin sidebar'
        }
        asChild
        variant="ghost"
        size={'smIcon'}
        onClick={togglePin}
        className="hover:bg-accent box-content cursor-pointer rounded-md p-1 transition-colors duration-300"
      >
        {isPinned ? (
          <PanelLeftClose size={18} />
        ) : (
          <PanelRightClose size={18} />
        )}
      </Button>
    </div>
  )
}
