import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { geistmono, inter, cabinet } from '@/lib/fonts'
import Provider from '@/lib/context/provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Task Master',
    template: '%s | Task Master',
  },
  description:
    'Streamline your workflow with Task Master - the intuitive task management application that helps you organize, prioritize, and track your projects efficiently.',
  keywords: ['task management', 'productivity', 'project tracking', 'todo app'],
  authors: [{ name: 'Ahmed Safwat' }],
  creator: 'Task Master',
  publisher: 'Task Master',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://task-master.app',
    title: 'Task Master - Efficient Task Management',
    description:
      'Streamline your workflow with Task Master - the intuitive task management application that helps you organize, prioritize, and track your projects efficiently.',
    siteName: 'Task Master',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Task Master - Efficient Task Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Task Master - Efficient Task Management',
    description:
      'Streamline your workflow with Task Master - the intuitive task management application.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistmono.variable} ${cabinet.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          {children}
          <SpeedInsights />
          <Analytics />
        </Provider>
      </body>
    </html>
  )
}
