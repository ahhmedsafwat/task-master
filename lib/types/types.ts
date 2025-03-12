export interface AuthResponse {
  status: 'error' | 'success' | 'idle'
  message: string | null
  errors?: Record<string, string[]>
  redirectTo?: string
}
