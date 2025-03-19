import 'server-only'
import { createSupabaseClient } from '@/utils/supabase/server'
export const getProjects = async () => {
  const supabase = await createSupabaseClient()
  const projects = await supabase.from('projects').select()

  if (projects.error) {
    return { data: null, error: projects.error }
  }

  return { data: projects.data, error: null }
}

/**
 * Get user data
 * Can be used to check if user is authenticated
 */
export async function getuser() {
  try {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return null
    }

    return data.user
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}
