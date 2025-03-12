import {
  LayoutDashboard,
  Inbox,
  BarChartBigIcon as ChartColumnBigIcon,
  LucideClipboardCheck,
} from 'lucide-react'
import type { ElementType } from 'react'
import React from 'react'

// Define the navigation item structure
export interface NavItem {
  title: string
  href: string
  icon: ElementType
}

export interface Project {
  id: string
  name: string
  icon?: React.ReactNode | ElementType
}

// Navigation items definition
export const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: LucideClipboardCheck,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: ChartColumnBigIcon,
  },
  {
    title: 'Inbox',
    href: '/notifications',
    icon: Inbox,
  },
]

// Sample projects data
export const sampleProjects: Project[] = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Project 2' },
  { id: '3', name: 'Project 3' },
  { id: '4', name: 'Project 4' },
  { id: '5', name: 'Project 5' },
  { id: '6', name: 'Project 6', icon: Inbox },
]

export const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: '/placeholder.svg?height=32&width=32',
}
