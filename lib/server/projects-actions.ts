// import 'server-only'
import { createSupabaseClient } from '@/utils/supabase/server'

export const getProjects = async () => {
  const supabase = await createSupabaseClient()
  const projects = await supabase.from('projects').select()

  if (projects.error) {
    return { data: null, error: projects.error }
  }

  return { data: projects.data, error: null }
}
