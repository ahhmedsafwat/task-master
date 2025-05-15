'use client'
import Link from 'next/link'
import { LazyMotion, domAnimation, type Variants } from 'motion/react'
import * as m from 'motion/react-m'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { FlipingText } from '@/components/ui/fliping-text'
import dynamic from 'next/dynamic'

const ThreeBackground = dynamic(() => import('./three-background'), {
  ssr: false,
  loading: () => <div className="bg-background absolute inset-0 -z-20" />,
})

const enteryVariant: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen py-24">
      <LazyMotion features={domAnimation}>
        <div className="absolute inset-0 -z-20">
          <ThreeBackground particleCount={50} />
        </div>

        <div className="container relative mx-auto px-4 py-28">
          <div className="text-center">
            <m.h1
              className="font-cabinet mx-auto mb-4 text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl"
              variants={enteryVariant}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4 }}
              onAnimationComplete={() => {}}
            >
              Schedule. Organize.{' '}
              <span className="text-rose-700">Accomplish.</span>
            </m.h1>
            <m.p
              className="text-primary-foreground mx-auto mb-10 max-w-xl font-mono text-sm sm:text-base md:text-xl"
              variants={enteryVariant}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              An open-source alternative for Notion and Linear (Not Really)
            </m.p>
            <m.div
              className="flex justify-center space-x-4"
              variants={enteryVariant}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Button asChild variant="outline" className="hover-scale">
                <Link href="https://github.com/ahhmedsafwat/task-master">
                  <Github className="mr-2 h-5 w-5" />
                  <FlipingText initialText="View on GitHub" />
                </Link>
              </Button>

              <Link href="/auth">
                <Button asChild variant="inverted" className="hover-scale">
                  <FlipingText initialText="Get Started" />
                </Button>
              </Link>
            </m.div>
          </div>
        </div>
      </LazyMotion>
      <div className="mx-auto aspect-video max-w-6xl overflow-hidden rounded-lg shadow-xl">
        <div className="bg-secondary flex h-full items-center justify-center">
          <p className="text-2xl font-semibold">Your Video Showcase Here</p>
        </div>
      </div>
    </section>
  )
}
