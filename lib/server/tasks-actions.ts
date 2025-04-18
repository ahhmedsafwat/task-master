'use server'

import { createSupabaseClient } from '@/utils/supabase/server'
import { createTaskprops, TaskResponse } from '../types/types'

// Updated to handle different user types
export async function createTask({
  title,
  userProfile,
  description,
  due_date,
  markdown_content,
  is_private,
  priority,
  project_id,
  status,
  start_date,
  creator_id,
}: createTaskprops): Promise<TaskResponse> {
  try {
    const supabase = await createSupabaseClient()

    // Get the user ID from either userProfile or creator_id parameter
    const userId = userProfile?.id || creator_id

    if (!userId) {
      return {
        status: 'error',
        message: 'User ID is required to create a task',
      }
    }

    const { error } = await supabase.from('tasks').insert([
      {
        creator_id: userId,
        title,
        description,
        is_private,
        status,
        priority,
        due_date,
        start_date,
        project_id,
        markdown_content,
      },
    ])

    if (error) {
      console.error('Error creating task:', error)
      return {
        status: 'error',
        message: error.message,
      }
    }

    return {
      status: 'created',
      message: 'Task created successfully',
    }
  } catch (error) {
    console.error('Error creating task:', error)
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create task',
    }
  }
}
