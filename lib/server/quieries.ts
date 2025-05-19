import 'server-only'
import { createSupabaseClient } from '@/utils/supabase/server'

/**
 * Get Profile data
 * fetches the user profile data from the database
 */
export const getProfile = async () => {
  try {
    const supabase = await createSupabaseClient()
    const { data: userData, error: userError } =
      await supabase.auth.getSession()

    if (userError && !userData.session) {
      console.error('User error:', userError)
      return { data: null, error: userError }
    }

    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userData.session?.user.id as string)
      .single()

    if (error) {
      console.error('Profile fetch error:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Get profile error:', error)
    return { data: null, error: { message: 'Failed to fetch profile', error } }
  }
}

/**
 * main get user function
 * used to get every thing about the user
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

/**
 * Get Project data |
 * fetches all projects from the database if you don't have rls enabled you would have to pass a user_id as a comparison value
 */
export const getProjects = async () => {
  try {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('projects').select()

    if (error) {
      console.error('Supabase query error:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error in getProjects:', error)
    return {
      data: null,
      error: { message: 'Failed to fetch projects', details: error },
    }
  }
}

export const getTasks = async (limit = 4) => {
  try {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) {
      console.error('Supabase query error:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error in getTasks:', error)
    return {
      data: null,
      error: { message: 'Failed to fetch tasks', details: error },
    }
  }
}
