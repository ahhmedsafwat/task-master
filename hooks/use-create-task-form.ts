import { TablesInsert } from '@/lib/types/database.types'
import { useState } from 'react'

interface createTaskFormData extends TablesInsert<'tasks'> {
  assignee_ids: string[]
}

export function useCreateTaskForm() {
  const [formData, setFormData] = useState<createTaskFormData>({
    title: '',
    assignee_ids: [],
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

  const resetFormData = () => {
    setFormData({
      title: '',
      assignee_ids: [],
      markdown_content: '',
      is_private: true,
      project_id: null,
      priority: 'LOW',
      status: 'BACKLOG',
      creator_id: '',
      due_date: null,
      start_date: null,
    })
  }

  return {
    formData,
    updateFormDataFields,
    resetFormData,
  }
}
