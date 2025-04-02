import Link from 'next/link'
import { RiTwitterXLine, RiGithubFill, RiInstagramLine } from 'react-icons/ri'
import Image from 'next/image'
import { Logo } from '@/components/ui/logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FooterLinkSection } from './footer-links'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navigationItems = [
  { title: 'Features', href: 'features' },
  { title: 'Pricing', href: 'pricing' },
  { title: 'Story', href: 'story' },
  { title: 'Developer', href: 'developer' },
]

const legalLinks = [
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms of Service', href: '/terms' },
]

const socialLinks = [
  {
    icon: RiTwitterXLine,
    href: 'https://x.com/ahhmed_ssafwatt',
    label: 'Twitter',
  },
  {
    icon: RiGithubFill,
    href: 'https://github.com/ahhmedsafwat/task-master',
    label: 'GitHub',
  },
  {
    icon: RiInstagramLine,
    href: 'https://www.instagram.com/ahmeed_safwatt/',
    label: 'Instagram',
  },
]

export function LandingFooter() {
  return (
    <footer className="rounded-t-4xl relative z-10 overflow-hidden">
      <Image
        alt="gradient background"
        src="/images/gradiant-bg3.webp"
        fill
        className="pointer-events-none object-cover"
        priority
      />
      <div className="glass-morph relative z-10">
        <div className="container mx-auto px-6 py-12 text-white">
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="flex h-full flex-col justify-between gap-4 max-md:items-center">
              <div className="mb-3 space-y-4 max-md:text-center">
                <Logo href="/" className="max-md:justify-center" />
                <p className="font-geist-mono text-sm text-gray-200">
                  Streamline your tasks and boost productivity with TaskMaster.
                  The ultimate task management solution for teams and
                  individuals.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="space-x-2">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      key={label + href}
                    >
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="border-gray-300 bg-neutral-100 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <Icon size={24} />
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="ml-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <FooterLinkSection title="Quick Links" links={navigationItems} />

            {/* Legal Links */}
            <FooterLinkSection title="Legal" links={legalLinks} />

            <div className="flex flex-col justify-between gap-3 max-md:flex-col-reverse max-md:items-center max-md:justify-center">
              <div className="w-full">
                <h3 className="font-geist-mono mb-2 font-semibold">
                  Stay up to date
                </h3>
                <form className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="focus-visible:ring-gray-30 border-white text-white placeholder:text-gray-300 focus-visible:border-gray-200"
                  />
                  <Button
                    type="submit"
                    size={'sm'}
                    className="hover-scale w-full bg-white text-gray-900 hover:bg-gray-200"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </section>
          <section className="font-geist-mono mt-4 border-t border-gray-200 pt-8 text-center text-sm text-gray-200 md:mt-28">
            © {new Date().getFullYear()} TaskMaster. All rights reserved.{' '}
            <br />
            Created by{' '}
            <Link
              href="https://github.com/ahhmedsafwat"
              className="underline hover:text-white"
            >
              Ahmed Safwat
            </Link>
          </section>
        </div>
      </div>
    </footer>
  )
}
