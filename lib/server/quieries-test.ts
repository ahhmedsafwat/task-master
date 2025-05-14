'use server'
import { User } from '@supabase/supabase-js'
import { TablesInsert, TablesUpdate } from '../types/database.types'
import { revalidatePath } from 'next/cache'
import { createSupabaseClient } from '@/utils/supabase/server'

interface createTaskprops extends TablesInsert<'tasks'> {
  user: User
  project_id?: string
}

interface updateTaskprops extends TablesUpdate<'tasks'> {
  user: User
}

export const createTask = async ({
  user,
  title,
  creator_id,
  project_id,
  is_private = true,
  status = 'BACKLOG',
  priority = 'LOW',
  due_date,
  start_date,
}: createTaskprops) => {
  if (!user) return { data: null, error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        creator_id,
        title,
        is_private,
        status,
        priority,
        due_date,
        start_date,
        project_id,
      },
    ])
    .select()

  if (error) {
    return { data: null, error: error }
  }
  revalidatePath('/test')
  return { data, error: null }
}

export const updateTask = async ({
  user,
  title,
  id,
  is_private = true,
  status = 'BACKLOG',
  priority = 'LOW',
  due_date,
  start_date,
}: Omit<updateTaskprops, 'creator_id'>) => {
  if (!user || !id) return { data: null, error: new Error('User Not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('tasks')
    .update({
      title,
      is_private,
      status,
      priority,
      due_date,
      start_date,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }
  if (data?.length === 0) {
    return {
      data: null,
      error: new Error('No task found or permission denied'),
    }
  }
  revalidatePath('/test')
  return { data, error: null }
}

export const getTasks = async ({ user }: { user: User }) => {
  if (!user) return { data: null, error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase.from('tasks').select('*')
  if (error) {
    return { data: null, error: new Error(error.message) }
  }
  return { data, error: null }
}

export const deleteTask = async ({
  user,
  task_id,
}: {
  user: User
  task_id: string
}) => {
  if (!user) return { error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', task_id)
    .select()

  if (error) {
    return { data: null, error: error }
  }
  if (data.length === 0) {
    return {
      data: null,
      error: new Error('No task found or permission denied'),
    }
  }

  revalidatePath('/test')
  return { data: data, error: null }
}

// Assign a user to a task (add an assignee)
export const assignTask = async ({
  user,
  task_id,
  assignee_id, // the user id to assign (dynamic, not hardcoded)
}: {
  user: User
  task_id: string
  assignee_id: string
}) => {
  if (!task_id || !user || !assignee_id)
    return { data: null, error: new Error('Missing required information') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('task_assignees')
    .insert([
      {
        task_id,
        user_id: assignee_id,
      },
    ])
    .select()

  if (error) {
    return { data: null, error }
  }
  // Optionally, trigger a revalidation if needed
  // revalidatePath("/test");
  return { data, error: null }
}

// Remove an assignee from a task
export const removeAssignee = async ({
  user,
  task_id,
  assignee_id,
}: {
  user: User
  task_id: string
  assignee_id: string
}) => {
  if (!task_id || !assignee_id || !user) {
    return { data: null, error: new Error('Missing required information') }
  }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('task_assignees')
    .delete()
    .eq('task_id', task_id)
    .eq('user_id', assignee_id)
    .select()

  if (error) {
    return { data: null, error }
  }
  // Optionally, revalidate the path
  // revalidatePath("/test");
  return { data, error: null }
}

// Get all assignees for a given task
export const getAssignees = async ({
  user,
  task_id,
}: {
  user: User
  task_id: string
}) => {
  if (!task_id || !user) {
    return { data: null, error: new Error('Missing required information') }
  }

  const supabase = await createSupabaseClient()
  // Here we select the related user_id and optionally join to profiles if needed.
  // For simplicity, this example returns the list of user_ids.
  const { data, error } = await supabase
    .from('task_assignees')
    .select('user_id')
    .eq('task_id', task_id)

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}

export const createProject = async ({
  user,
  name,
  description,
}: {
  user: User
  name: string
  description: string
}) => {
  if (!user || !name || !description)
    return { data: null, error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        name,
        description,
        creator_id: user.id,
      },
    ])
    .select()

  if (error) {
    return { data: null, error: error }
  }

  const member = await supabase.from('project_members').insert([
    {
      project_id: data[0].id,
      user_id: user.id,
      role: 'OWNER',
    },
  ])

  if (member.error) {
    return { data: null, error: member.error }
  }

  return { data, error: null }
}

export const createProjectMember = async ({
  user,
  user_id,
  project_id,
}: {
  user: User
  user_id: string
  project_id: string
}) => {
  if (!user) return { data: null, error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('project_members')
    .insert([
      {
        project_id,
        user_id,
      },
    ])
    .select()

  if (error) {
    return { data: null, error: error }
  }

  return { data, error: null }
}

export const updateProject = async ({
  user,

  project_id,
}: {
  user: User

  project_id: string
}) => {
  if (!user) return { data: null, error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .update({
      name: 'updated Project',
      description:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
    })
    .eq('id', project_id)
    .eq('creator_id', user.id)
    .select()

  if (error) {
    return { data: null, error: error }
  }

  return { data, error: null }
}

export const deleteProject = async ({
  user,
  project_id,
}: {
  user: User
  project_id: string
}) => {
  if (!user) return { data: null, error: new Error('User not provided') }

  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', project_id)
    .eq('creator_id', user.id)

  if (error) {
    return { data: null, error: error }
  }

  return { data: null, error: null }
}

// Update the role of a project member
export const updateProjectMemberRole = async ({
  user,
  project_id,
  user_id, // The ID of the member whose role you want to update
  new_role, // New role value: 'VIEWER', 'MEMBER', or 'ADMIN'
}: {
  user: User
  project_id: string
  user_id: string
  new_role: 'VIEWER' | 'MEMBER' | 'ADMIN'
}) => {
  if (!user || !project_id || !user_id || !new_role) {
    return { data: null, error: new Error('Missing required information') }
  }

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('project_members')
    .update({ role: new_role })
    .eq('project_id', project_id)
    .eq('user_id', user_id)
    .select()

  if (error) {
    return { data: null, error }
  }
  return { data, error: null }
}
export const getProjectMembers = async ({
  user,
  project_id,
}: {
  user: User
  project_id: string
}) => {
  if (!user) return { data: null, error: new Error('User not provided') }
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('project_members')
    .select()
    .eq('project_id', project_id)

  if (error) return { data: null, error }

  return { data, error: null }
}
export const deleteProjectMembers = async ({
  user,
  project_id,
  user_id,
}: {
  user: User
  project_id: string
  user_id: string
}) => {
  if (!user) return { error: new Error('User not provided') }
  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('project_members')
    .delete()
    .eq('project_id', project_id)
    .eq('user_id', user_id)

  if (error) return { error }

  return { error: null }
}

export const removeSelfFromProject = async ({
  user,
  project_id,
}: {
  user: User
  project_id: string
}) => {
  if (!user) return { error: new Error('User not provided') }
  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('project_members')
    .delete()
    .eq('project_id', project_id)
    .eq('user_id', user.id)

  if (error) return { error }

  return { error: null }
}
