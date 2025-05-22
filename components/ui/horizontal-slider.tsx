'use client'

import type React from 'react'
import { useRef, useState, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HorizontalSliderProps {
  children: ReactNode
  className?: string
  showShadows?: boolean
  shadowSize?: number
}

export default function HorizontalSlider({
  children,
  className,
  showShadows = true,
  shadowSize = 80,
}: HorizontalSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(true)

  // Handle scroll position to determine shadow visibility
  const handleScroll = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setShowLeftShadow(scrollLeft > 0)
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1) // -1 for rounding errors
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', handleScroll)
      // Initial check for shadows
      handleScroll()
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return

    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative">
      {/* Left shadow */}
      {showShadows && showLeftShadow && (
        <div
          className={cn(
            `pointer-events-none absolute -left-8 bottom-0 top-0 z-10 bg-gradient-to-r from-black/20 to-transparent`,
          )}
          style={{ width: shadowSize }}
          aria-hidden="true"
        />
      )}

      {/* Slider container */}
      <div
        ref={sliderRef}
        className={cn(
          'flex h-fit gap-4 overflow-x-auto',
          isDragging ? 'select-none' : '',
          className,
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch', // For momentum scrolling on iOS
          scrollbarWidth: 'none',
        }}
        role="region"
        aria-label="Horizontal scrollable content"
      >
        {children}
      </div>

      {/* Right shadow */}
      {showShadows && showRightShadow && (
        <div
          className={`pointer-events-none absolute -right-8 bottom-0 top-0 z-10 bg-gradient-to-l from-black/20 to-transparent`}
          style={{
            width: shadowSize,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Helper class to hide scrollbars but keep functionality
// Add this to your global CSS or use it directly in the component
