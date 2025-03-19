import { useState, useEffect, useCallback } from 'react'

interface UseSidebarOptions {
  initialPinned?: boolean
}

// might turn it into a context in the feature
export function useSidebar({ initialPinned = true }: UseSidebarOptions = {}) {
  // State management
  const [isPinned, setIsPinned] = useState(initialPinned)
  const [isHovering, setIsHovering] = useState(false)
  const [isNavHovered, setIsNavHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Auto-pin on desktop, auto-unpin on mobile
      if (mobile && isPinned) {
        setIsPinned(false)
      }

      if (!mobile && !isPinned) {
        setIsPinned(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add resize listener
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Handle proximity hover effect (desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPinned) {
        // Show navigation when mouse is within 30px of the left edge
        const isInHoverZone = e.clientX <= 30
        setIsHovering(isInHoverZone)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isPinned, isMobile])

  // Determine if the navbar should be visible
  const isNavVisible = isPinned || (!isMobile && (isHovering || isNavHovered))

  // Toggle pin state
  const togglePin = useCallback(() => setIsPinned((prev) => !prev), [])

  // Handle mouse enter/leave for nav
  const handleNavMouseEnter = useCallback(
    () => !isMobile && !isPinned && setIsNavHovered(true),
    [isPinned, isMobile],
  )
  const handleNavMouseLeave = useCallback(
    () => !isMobile && !isPinned && setIsNavHovered(false),
    [isMobile, isPinned],
  )

  // Close nav on mobile
  const closeNav = useCallback(() => {
    if (isMobile) {
      setIsPinned(false)
    }
  }, [isMobile])

  return {
    isPinned,
    isHovering,
    isNavHovered,
    isMobile,
    isNavVisible,
    togglePin,
    handleNavMouseEnter,
    handleNavMouseLeave,
    closeNav,
  }
}
