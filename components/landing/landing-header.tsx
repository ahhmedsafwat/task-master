'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MenuIcon } from '@/components/ui/menu-icon'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

import { FlipingText } from '@/components/ui/fliping-text'
import { IoLogoGithub, IoMdArrowDropup, IoIosCode } from 'react-icons/io'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChevronDownIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Logo } from '@/components/ui/logo'

interface Navlinks {
  title: string
  href?: string
  children?: (Navlinks & { icon?: React.ReactNode })[]
}

const navigationItems: Navlinks[] = [
  {
    title: 'Features',
    href: '/features',
  },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Story', href: '/story' },
  {
    title: 'Developers',
    children: [
      {
        title: 'Github',
        href: 'https://github.com/ahhmedsafwat/task-master',
        icon: <IoLogoGithub size={24} />,
      },
      {
        title: 'API Documentation',
        href: '/developers/api',
        icon: <IoIosCode size={24} />,
      },
    ],
  },
]

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handelScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    document.addEventListener('scroll', handelScroll)
    return () => {
      document.removeEventListener('scroll', handelScroll)
    }
  }, [])

  return (
    <>
      <header className="fixed top-6 z-50 w-full">
        <nav className="container relative mx-auto px-6 lg:px-9">
          <div
            className={cn(
              `flex h-16 items-center justify-between rounded-2xl border border-transparent px-3 py-1.5 transition-all duration-300 lg:top-4`,
              {
                'glass-morph shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]':
                  hasScrolled && !isMenuOpen,
              },
            )}
          >
            <Logo
              href="/"
              className={cn({ 'text-white': hasScrolled || isMenuOpen })}
            />
            <ul className="hidden items-center gap-6 lg:flex">
              {navigationItems.map(({ href, title, children }: Navlinks) => {
                if (href) {
                  return (
                    <li key={href} className="relative">
                      {href && (
                        <Link
                          href={href}
                          className={cn(
                            'font-geist-mono text-muted-foreground hover:text-primary-foreground text-sm font-medium transition-colors',
                            {
                              'text-gray-300 hover:text-white':
                                hasScrolled || isMenuOpen,
                            },
                          )}
                        >
                          <FlipingText initialText={title} />
                        </Link>
                      )}
                    </li>
                  )
                }
                return (
                  <li
                    key={title}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span
                      className={cn(
                        'font-geist-mono text-muted-foreground hover:text-primary-foreground flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors',
                        {
                          'text-gray-300 hover:text-white':
                            hasScrolled || isMenuOpen,
                        },
                      )}
                    >
                      {title}
                      <ChevronDownIcon
                        size={16}
                        className={cn('transition-transform duration-200', {
                          'rotate-180': activeDropdown === title,
                        })}
                      />
                    </span>
                    <AnimatePresence>
                      {activeDropdown === title && (
                        <motion.ul
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.625, 0.05, 0, 1],
                          }}
                          className="bg-secondary absolute left-0 top-8 w-56 rounded-md border p-2 shadow-lg"
                        >
                          <IoMdArrowDropup className="text-secondary absolute -top-[11px] left-[50%] size-9 h-8 w-full -translate-x-[50%] bg-transparent" />
                          {children?.map(({ href, title, icon }) => (
                            <motion.li
                              key={href}
                              className="py-1"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.2,
                                ease: [0.625, 0.05, 0, 1],
                              }}
                            >
                              <Link
                                href={href ?? ''}
                                className="text-accent-foreground hover:text-primary-foreground hover:bg-muted group flex w-full items-center gap-2 rounded-md p-[3px] text-xs transition-colors duration-300"
                              >
                                <span className="group-hover:border-primary-foreground rounded-md border p-[4px] transition-colors">
                                  <span className="block transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                                    {icon}
                                  </span>
                                </span>
                                <span>{title}</span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              <Link href="/auth">
                <Button asChild variant={'inverted'} className="hover-scale">
                  <FlipingText initialText="Get Started" />
                </Button>
              </Link>
            </div>
            <div className="relative lg:hidden">
              <MenuIcon
                isMenuOpen={isMenuOpen}
                toggleMenu={() => setIsMenuOpen((prev) => !prev)}
                className={cn(
                  'hover:border-accent-foreground/30 bg-background/30 hover:bg-background/10 py-5',
                )}
              />
            </div>
          </div>
        </nav>
      </header>
      <div
        className={cn(
          'bg-secondary fixed left-full top-0 z-30 flex h-screen w-screen flex-col px-3 py-2 pb-6 pt-28 transition-all duration-500 ease-in-out sm:px-8 lg:hidden',
          { 'left-0': isMenuOpen },
        )}
      >
        <ul className="mb-auto flex flex-col justify-center">
          {navigationItems.map(({ href, title, children }: Navlinks) => {
            if (href) {
              return (
                <Link
                  key={href}
                  href={href}
                  className="border-foreground relative cursor-pointer border-b py-3"
                >
                  <li className="font-geist-mono text-primary-foreground text-2xl font-bold sm:text-3xl">
                    {title}
                  </li>
                </Link>
              )
            }
            return (
              <li
                key={title}
                className="border-foreground relative cursor-pointer border-b"
              >
                <Accordion collapsible type="single">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="font-geist-mono text-primary-foreground text-2xl font-bold sm:text-3xl">
                      {title}
                    </AccordionTrigger>
                    {children && (
                      <AccordionContent className="text-xl">
                        <ul className="ml-4 mt-4">
                          {children?.map(({ href, title, icon }) => {
                            return (
                              <Link
                                key={href}
                                href={href ?? ''}
                                className="text-accent-foreground hover:text-primary-foreground hover:bg-muted/70 group flex w-full items-center gap-3 rounded-md p-2 transition-colors"
                              >
                                <span className="group-hover:border-primary-foreground rounded-xl border p-2 transition-colors">
                                  <span className="block transition-transform group-hover:rotate-6 group-hover:scale-110">
                                    {icon}
                                  </span>
                                </span>
                                <span>{title}</span>
                              </Link>
                            )
                          })}
                        </ul>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              </li>
            )
          })}
        </ul>
        <div>
          <Button asChild variant={'inverted'} className="w-full py-5">
            <Link href="/auth" className="">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
