'use client'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/hooks/use-sidebar'
import { SidebarHeader } from './sidebar-header'
import { SidebarNavigation } from './sidebar-navigation'
import { SidebarProjects } from './sidebar-projects'
import { Project } from '@/lib/types/types'
import { MenuIcon } from '@/components/ui/menu-icon'

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
      <div className="absolute left-4 top-4">
        {isMobile && (
          <MenuIcon
            isMenuOpen={isPinned}
            toggleMenu={togglePin}
            className="flex-shrink-0"
          />
        )}
      </div>
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
          {/* Header with logo and pin/unpin button */}
          <SidebarHeader
            isPinned={isPinned}
            togglePin={togglePin}
            isMobile={isMobile}
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
          className="fixed inset-0 z-30 bg-black/30"
          onClick={() => isMobile && togglePin()}
          aria-hidden="true"
        />
      ) : null}
    </>
  )
}
