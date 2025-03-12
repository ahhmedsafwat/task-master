'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import { useHoverEffect } from '@/hooks/use-hover-effect'

interface HoverScaleTextProps {
  initialText: string
  className?: string
}

export const FlipingText = ({
  initialText,
  className,
}: HoverScaleTextProps) => {
  const { isHovered, hoverProps } = useHoverEffect()

  const letterVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { y: -20, opacity: 0 },
  }

  const hoverLetterVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  }

  return (
    <div className={`relative ${className}`} {...hoverProps}>
      <div className="relative overflow-clip">
        {/* Initial text */}
        <div className="relative">
          {initialText.split('').map((letter, index) => (
            <motion.span
              key={`initial-${index}`}
              className="inline-block"
              variants={letterVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              transition={{
                duration: 0.8,
                ease: [0.625, 0.05, 0, 1],
                delay: index * 0.01,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Hover text */}
        <div className="absolute left-0 top-0">
          {initialText.split('').map((letter, index) => (
            <motion.span
              key={`hover-${index}`}
              className="inline-block"
              variants={hoverLetterVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              transition={{
                duration: 0.8,
                ease: [0.625, 0.05, 0, 1],
                delay: index * 0.01,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}
