import {
  LayoutDashboard,
  Inbox,
  BarChartBigIcon as ChartColumnBigIcon,
  LucideClipboardCheck,
} from 'lucide-react'
import type { ElementType } from 'react'

// Define the navigation item structure
export interface NavItem {
  title: string
  href: string
  icon: ElementType
}

export interface Project {
  id: string
  name: string
  icon?: ElementType
}

// Navigation items definition
export const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Tasks',
    href: '/dashboard/my-tasks',
    icon: LucideClipboardCheck,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: ChartColumnBigIcon,
  },
  {
    title: 'Inbox',
    href: '/dashboard/notifications',
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
}
