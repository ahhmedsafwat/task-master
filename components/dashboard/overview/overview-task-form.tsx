'use client'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { MultiSelectAssignees } from '@/components/ui/multi-select-assignees'
import { ProjectsSearchDropDown } from '@/components/ui/project-search-dropdown'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCreateTaskForm } from '@/hooks/use-create-task-form'
import { Enums, Tables } from '@/lib/types/database.types'
import { TaskResponse, userProfile } from '@/lib/types/types'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { DatePickerField } from './overview-task-data-picker'
import { PrivateTaskCheckbox } from './overview-task-private'
import { Selections } from './overview-task-selections'
import {
  Minus,
  SignalMedium,
  SignalHigh,
  Signal,
  CircleDashed,
  Loader,
  CircleCheck,
} from 'lucide-react'
import Link from 'next/link'

// Task form component
export const TaskForm = ({
  createTaskAction,
  isPending,
  onSuccessAction,
  createTaskResponse,
}: {
  createTaskResponse: TaskResponse
  createTaskAction: any
  isPending: boolean
  onSuccessAction: () => void
}) => {
  const { formData, updateFormDataFields, resetFormData } = useCreateTaskForm()

  const [users, setUsers] = useState<userProfile[]>([])
  const [projects, setProjects] = useState<Partial<Tables<'projects'>>[]>([])

  // Handle server action responses
  useEffect(() => {
    if (createTaskResponse.status === 'error' && createTaskResponse.message) {
      toast.error(createTaskResponse.message)
    }

    if (
      createTaskResponse.status === 'created' &&
      createTaskResponse.data?.taskId
    ) {
      toast.success('Task created successfully!', {
        description: (
          <Link
            href={`/dashboard/${createTaskResponse.data.taskId}`}
            className="text-blue-500 underline hover:text-blue-600"
          >
            View task
          </Link>
        ),
      })

      // Only reset form on successful creation
      resetFormData()
      onSuccessAction()
    }

    setProjects([])
    setUsers([])

    return () => {
      createTaskResponse.status = 'idle'
      createTaskResponse.message = null
    }
  }, [
    createTaskResponse.status,
    createTaskResponse.message,
    createTaskResponse.data?.taskId,
    onSuccessAction,
  ])

  return (
    <form
      className="flex min-h-0 flex-col justify-between overflow-hidden"
      action={createTaskAction}
    >
      {/* Task Title */}
      <DialogHeader className="mb-4">
        <DialogTitle>
          <Input
            type="text"
            id="task-title"
            name="title"
            placeholder="Task title"
            className="text-2xl! h-14 text-pretty rounded-md border-0 p-2 font-bold shadow-none ring-0 selection:bg-[#373b67] placeholder:text-2xl focus-visible:ring-0"
            autoFocus
            required
            value={formData.title ?? ''}
            onChange={(e) => updateFormDataFields('title', e.target.value)}
          />
        </DialogTitle>
      </DialogHeader>

      {/* Form Fields Grid */}
      <div className="flex flex-col gap-3.5">
        {/* Project Selection */}
        <ProjectsSearchDropDown
          projects={projects as { id: string; name: string }[]}
          label="Project"
          onProjectSelect={(value) => {
            updateFormDataFields('project_id', value)
          }}
          placeholder="Search projects..."
          disabled={!!formData.is_private}
          initialSelectedProjectId={
            formData.project_id ? formData.project_id : undefined
          }
        />
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={'project_id'}
          value={formData.project_id ?? ''}
        />
        {/* Priority and Status */}
        <Selections
          label="Priority"
          icon={<Minus size={18} />}
          defaultValue={formData.priority as Enums<'task_priority'>}
          options={[
            { option: 'LOW', icon: <SignalMedium size={18} /> },
            { option: 'MEDIUM', icon: <SignalHigh size={18} /> },
            {
              option: 'HIGH',
              icon: <Signal size={18} />,
            },
          ]}
          updateFormData={(field, value) =>
            updateFormDataFields(field as any, value)
          }
        />
        <Selections
          label="Status"
          defaultValue={formData.status as Enums<'task_status'>}
          icon={<Minus size={18} />}
          options={[
            {
              option: 'BACKLOG',
              icon: <CircleDashed />,
            },
            {
              option: 'IN_PROGRESS',
              icon: <Loader className="text-in-progress" />,
            },
            {
              option: 'COMPLETED',
              icon: <CircleCheck className="text-success" />,
            },
          ]}
          updateFormData={(field, value) =>
            updateFormDataFields(field as any, value)
          }
        />

        {/* Assignees Selection - Replace single assignee with multiple assignees */}
        <MultiSelectAssignees
          users={users}
          label="Assignees"
          placeholder="search user assign..."
          maxDisplayItems={3}
          disabled={!!formData.is_private || formData.project_id === ''}
          onItemSelect={(value) => updateFormDataFields('assignee_ids', value)}
        />
        {/* Hidden input for form submission - array of assignee IDs */}
        {formData.assignee_ids.map((id) => (
          <input type="hidden" key={id} name="assignee_ids" value={id} />
        ))}
        {/* Start Date */}
        <DatePickerField
          id="due_date"
          label="Due Date"
          date={formData.start_date || null}
          onSelect={(date) => updateFormDataFields('start_date', date)}
        />
      </div>

      {/* Markdown Description */}
      <Textarea
        placeholder="Add description (Markdown supported)..."
        name="markdown_content"
        value={formData.markdown_content || ''}
        onChange={(e) =>
          updateFormDataFields('markdown_content', e.target.value)
        }
        className="dark:bg-secondary bg-secondary mt-3 h-full max-h-[200px] min-h-[100px] resize-none text-pretty border-none px-2 pb-3 pt-0 shadow-none ring-0 selection:bg-[#373b67] focus:outline-none focus:ring-0 focus-visible:ring-0"
      />

      <Separator className="my-4" />

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        {/* Private Task Checkbox */}
        <PrivateTaskCheckbox
          isPrivate={formData.is_private!}
          onCheckedChange={(checked) => {
            updateFormDataFields('is_private', checked)

            if (checked) {
              updateFormDataFields('project_id', null)
              updateFormDataFields('assignee_ids', [])
            }
          }}
        />

        <input
          type="hidden"
          name="is_private"
          value={formData.is_private ? 'true' : 'false'}
        />
        {/* Hidden input for form submission */}
        <Button
          variant={'main'}
          disabled={isPending || !formData.title}
          className="w-28 text-white"
        >
          {isPending ? 'Creating...' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}
