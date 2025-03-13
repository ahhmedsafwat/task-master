'use server'

import { getuser } from '@/app/auth/actions'
import { createSupabaseClient } from '@/utils/supabase/server'

export const userProfile = async () => {
  try {
    const user = await getuser()

    if (!user || !user?.email) {
      return { data: null, error: new Error('User not found') }
    }

    const supabase = await createSupabaseClient()

    const { data, error } = await supabase
      .from('profiles')
      .select(`username , email`)
      .eq('email', user.email)
      .single()

    if (error && !data) {
      return { data: null, error: error }
    }

    return { data, error }
  } catch (error) {
    return { data: null, error: `unexpcted error: ${error}` }
  }
}
