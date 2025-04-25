import { Tables, TablesInsert } from '@/lib/types/database.types'
import { userProfile } from '@/lib/types/types'
import { useEffect, useMemo, useState } from 'react'

interface createTaskFormData extends TablesInsert<'tasks'> {
  assignee_id: string | undefined
}

export function useCreateTaskForm() {
  const [formData, setFormData] = useState<createTaskFormData>({
    title: '',
    assignee_id: undefined,
    markdown_content: '',
    is_private: true,
    project_id: null,
    priority: 'LOW',
    status: 'BACKLOG',
    creator_id: '',
    due_date: null,
    start_date: null,
  })

  const updateFormDataFields = <K extends keyof createTaskFormData>(
    field: K,
    value: createTaskFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const [searchProjectQuery, setSearchProjectQuery] = useState('')
  const [searchUserQuery, setSearchUserQuery] = useState('')

  const [users, setUsers] = useState<userProfile[]>([])
  const [projects, setProjects] = useState<Partial<Tables<'projects'>>[]>([])

  // Mock projects and users for demonstration
  useEffect(() => {
    setProjects([
      {
        id: 'bc5ff954-6f59-4b83-9742-e55fb0021f41',
        name: 'Website Redesign',
        creator_id: '',
      },
      {
        id: 'dc525794-93d8-4d18-a14a-429a039cedc0',
        name: 'Mobile App',
        creator_id: '',
      },
      {
        id: '64190958-948b-4ef0-aaf6-a293460fe97e',
        name: 'Dashboard UI',
        creator_id: '',
      },
    ])

    setUsers([
      {
        id: 'a03c3921-b52f-49e2-add8-ccd24983834b',
        username: 'John Doe',
        email: 'john@example.com',
        avatar_url: '',
      },
      {
        id: 'user2',
        username: 'Jane Smith',
        email: 'jane@example.com',
        avatar_url: '',
      },
      {
        id: 'user3',
        username: 'Alex Johnson',
        email: 'alex@example.com',
        avatar_url: '',
      },
    ])
  }, [])

  const filteredProjects = useMemo(
    () =>
      searchProjectQuery.trim() === ''
        ? []
        : projects.filter((project) =>
            project.name
              ?.toLowerCase()
              .includes(searchProjectQuery.toLowerCase()),
          ),
    [searchProjectQuery, projects],
  )

  const filteredUsers = useMemo(
    () =>
      searchUserQuery.trim() === ''
        ? []
        : users.filter(
            (user) =>
              user.username
                ?.toLowerCase()
                .includes(searchUserQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchUserQuery.toLowerCase()),
          ),
    [searchUserQuery, users],
  )

  const resetFormData = () => {
    setFormData({
      title: '',
      assignee_id: undefined,
      markdown_content: '',
      is_private: true,
      project_id: null,
      priority: 'LOW',
      status: 'BACKLOG',
      creator_id: '',
      due_date: null,
      start_date: null,
    })

    setSearchProjectQuery('')
    setSearchUserQuery('')
  }

  return {
    filteredProjects,
    filteredUsers,
    formData,
    searchProjectQuery,
    searchUserQuery,
    projects,
    users,
    setProjects,
    setUsers,
    updateFormDataFields,
    setSearchProjectQuery,
    setSearchUserQuery,
    resetFormData,
  }
}
