'use client'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/hooks/use-sidebar'

import { SidebarNavigation } from './sidebar-navigation'
import { SidebarProjects } from './sidebar-projects'
import { Project } from '@/lib/types/types'
import { MenuIcon } from '@/components/ui/menu-icon'

import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarHeader } from './sidebar-header'

export function AppSidebar({ projects }: { projects: Project[] }) {
  // Use our custom sidebar hook
  const {
    isPinned,
    isMobile,
    isNavVisible,
    togglePin,
    handleNavMouseEnter,
    handleNavMouseLeave,
    closeNav,
  } = useSidebar()

  // References
  const navRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Left side with menu icon (only on mobile) */}
      <div className="absolute left-5 top-5 z-50">
        {isMobile && (
          <MenuIcon
            isMenuOpen={isPinned}
            toggleMenu={togglePin}
            className="flex-shrink-0"
          />
        )}
      </div>

      {/* Pin/Unpin Button for Desktop */}
      {!isMobile && (
        <div className="fixed bottom-5 left-5 z-50">
          <Button
            aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
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
      )}

      <nav
        aria-label="Main navigation"
        className={cn(
          'z-50 h-screen transition-all duration-300 ease-in-out',
          isPinned && !isMobile ? 'w-60' : 'w-0',
          isMobile && 'fixed',
        )}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        {/* Navigation panel */}
        <div
          ref={navRef}
          className={cn(
            'bg-secondary dark:bg-primary relative z-40 flex h-full w-60 flex-col py-4 pl-2 transition-all duration-300 ease-in-out',
            // Floating state when not pinned but hovering
            !isPinned && !isMobile && isNavVisible
              ? 'left-0 m-2 h-[calc(100%-1rem)] rounded-md pr-2 shadow-2xl'
              : !isNavVisible && '-left-60',
            // Fixed position for mobile - ensure it contains the dropdown
            isMobile &&
              isPinned &&
              'fixed left-0 overflow-y-auto overflow-x-visible pr-2',
          )}
        >
          {/* Logo at the top */}
          <SidebarHeader
            isMobile={isMobile}
            isPinned={isPinned}
            togglePin={togglePin}
          />

          <Separator decorative className="my-3" />
          {/* Navigation items */}
          <SidebarNavigation onItemClick={closeNav} />
          <Separator decorative className="my-3" />
          {/* Projects section */}
          <SidebarProjects onItemClick={closeNav} projects={projects} />
        </div>
      </nav>

      {/* Background overlay - appears when nav is floating or mobile menu is open */}
      {(isMobile && isPinned) || (!isMobile && !isPinned && isNavVisible) ? (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => isMobile && togglePin()}
          aria-hidden="true"
        />
      ) : null}
    </>
  )
}
