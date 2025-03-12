import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
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
    <div className="bg-background flex items-center justify-between rounded-lg border px-2 py-2 shadow">
      <Logo href={'/overview'} textClassName="sm:text-sm" svgSize={34} />

      {/* Toggle button */}
      <Button
        aria-label={
          isMobile ? 'Close menu' : isPinned ? 'Unpin sidebar' : 'Pin sidebar'
        }
        asChild
        variant="ghost"
        size={'smIcon'}
        onClick={togglePin}
        className="hover:bg-primary-foreground/10 box-content cursor-pointer rounded-md p-1 transition-colors"
      >
        {isPinned ? (
          <PanelLeftClose size={20} />
        ) : (
          <PanelRightClose size={20} />
        )}
      </Button>
    </div>
  )
}
