import { ElementType } from 'react'
import { Tables, TablesInsert } from './database.types'
import { LucideIcon } from 'lucide-react'

export interface AuthResponse {
  status: 'error' | 'success' | 'idle'
  message: string | null
  errors?: Record<string, string[]>
  redirectTo?: string
}

export interface TaskResponse {
  status: 'error' | 'created' | 'updated' | 'deleted' | 'idle'
  message: string | null
}

export type IconComponent = ElementType<{
  size?: number
  className?: string
}>

export interface Project extends Tables<'projects'> {
  icon?: IconComponent
}

export interface userProfile {
  id?: string
  email: string
  avatar_url: string | null
  username: string | null
}

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

export interface createTaskprops extends TablesInsert<'tasks'> {
  userProfile: userProfile | null
}
