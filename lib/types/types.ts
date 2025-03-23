import { ElementType } from 'react'
import { Tables } from './database.types'

export interface AuthResponse {
  status: 'error' | 'success' | 'idle'
  message: string | null
  errors?: Record<string, string[]>
  redirectTo?: string
}

export type IconComponent = ElementType<{
  size?: number
  className?: string
}>

export interface Project extends Tables<'projects'> {
  icon?: IconComponent
  image?: string
}

export interface userProfile {
  email: string
  avatar_url?: string
  username: string | null
}
