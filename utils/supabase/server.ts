// utils/supabase.ts
import { Database } from '@/lib/types/database.types'
import { createServerClient } from '@supabase/ssr'

import { cookies } from 'next/headers'

export const createSupabaseClient = async () => {
  const cookiesStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookiesStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              return cookiesStore.set(name, value, options)
            })
          } catch (error) {
            throw error
          }
        },
      },
    },
  )
}
