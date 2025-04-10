'use server'

import { createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAvatar({
  file,
  userId,
}: {
  file: File
  userId: string
}) {
  try {
    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/avatar.${fileExt}`

    const supabase = await createSupabaseClient()
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: 'no-cache',
      })

    if (error) throw error

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Failed to get public URL for the uploaded file')
    }

    // Update the profile with the new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)

    if (updateError) throw updateError
    revalidatePath('/dashboard/profile')
    return publicUrl
  } catch (error) {
    console.error('Avatar update error:', error)
    throw new Error('Failed to update avatar')
  }
}

export async function updateUsername({
  username,
  userId,
}: {
  username: string
  userId: string
}) {
  try {
    if (!username.trim()) {
      return {
        status: 'error',
        message: 'Username cannot be empty',
      }
    }

    const supabase = await createSupabaseClient()
    const { error } = await supabase
      .from('profiles')
      .update({ username })
      .eq('id', userId)

    if (error) {
      console.error('Username update error:', error)
      return {
        status: 'error',
        message: 'Failed to update username',
      }
    }

    revalidatePath('/dashboard/profile')
    return {
      status: 'success',
      message: 'Username updated successfully',
    }
  } catch (error) {
    console.error('Username update error:', error)
    return {
      status: 'error',
      message: 'An unexpected error occurred',
    }
  }
}

export async function DeleteProfile({ userId }: { userId: string }) {
  try {
    const supabase = await createSupabaseClient()
    const { error } = await supabase.from('profiles').delete().eq('id', userId)
    if (error) {
      return {
        status: 'error',
        message: 'Failed to delete profile',
      }
    }
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Profile deletion error:', error)
    return {
      status: 'error',
      message: error,
    }
  }
}
