import { TablesInsert } from '@/lib/types/database.types'
import { ReactNode } from 'react'

export interface AuthResponse {
  status: 'error' | 'success' | 'idle'
  message: string | null
  errors?: Record<string, string[]>
  redirectTo?: string
}

export interface TaskResponse {
  status: 'error' | 'created' | 'updated' | 'deleted' | 'idle'
  message: string | null
  errors?: Record<string, string[]>
  data?: {
    taskId?: string
  }
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
  icon: ReactNode
}

export interface createTaskprops extends TablesInsert<'tasks'> {
  userProfile: userProfile | null
}
