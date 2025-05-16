import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCreateTaskForm } from '@/hooks/use-create-task-form'
import { createTask } from '@/lib/server/task-actions'
import { TaskResponse, userProfile } from '@/lib/types/types'
import { Link, Minus, Plus } from 'lucide-react'
import { useState, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { ProjectsSearchDropDown } from '@/components/ui/project-search-dropdown'
import { MultiSelectAssignees } from '@/components/ui/multi-select-assignees'
import { Enums, Tables } from '@/lib/types/database.types'
import { DatePickerField } from './overview-task-data-picker'
import { AttrbuiteLable } from './overview-task-attrubites-lable'

// Priority and Status selection component
const PriorityStatusSelections = ({
  priority,
  status,
  updateFormData,
}: {
  priority: string | null
  status: string | null
  updateFormData: (field: string, value: any) => void
}) => (
  <>
    {/* Priority */}
    <div className="flex gap-2">
      <AttrbuiteLable label="Priority" icon={<Minus size={18} />} />
      <Select
        name="priority"
        value={priority || 'LOW'}
        onValueChange={(value) => {
          updateFormData('priority', value as Enums<'task_priority'>)
        }}
      >
        <SelectTrigger className="w-full" id="priority">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Status */}
    <div className="flex gap-2">
      <AttrbuiteLable label="Status" icon={<Minus size={18} />} />
      <Select
        name="status"
        value={status || 'BACKLOG'}
        onValueChange={(value) => {
          updateFormData('status', value as Enums<'task_status'>)
        }}
        aria-label="Select task status"
      >
        <SelectTrigger className="w-full" id="Status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BACKLOG">Backlog</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
)

// Private checkbox component
const PrivateTaskCheckbox = ({
  isPrivate,
  onCheckedChange,
}: {
  isPrivate: boolean | undefined
  onCheckedChange: (checked: boolean) => void
}) => (
  <div className="mt-6 flex items-center space-x-2 md:col-span-2">
    <Checkbox
      id="is_private"
      checked={isPrivate}
      onCheckedChange={onCheckedChange}
      aria-label="Mark task as private"
    />
    <Label htmlFor="is_private" className="cursor-pointer">
      Private task (only visible to you)
    </Label>
  </div>
)

// Task form component
const TaskForm = ({
  createTaskAction,
  isPending,
  onSuccess,

  status,
}: {
  status: TaskResponse
  createTaskAction: any
  isPending: boolean
  onSuccess: () => void
}) => {
  const { formData, updateFormDataFields, resetFormData } = useCreateTaskForm()

  const [users, setUsers] = useState<userProfile[]>([])
  const [projects, setProjects] = useState<Partial<Tables<'projects'>>[]>([])
  // Handle server action responses
  useEffect(() => {
    if (status.status === 'error' && status.message) {
      toast.error(status.message)
    }

    if (status.status === 'created') {
      toast.success(status.message, {
        description: (
          <Link
            href={`/dashboard/${status.data?.taskId}`}
            className="text-blue-500 underline"
          >
            View task
          </Link>
        ),
      })
      onSuccess()
      resetFormData()
    }

    // Mock projects and users for demonstration

    setProjects([
      {
        id: '7fc6f9c9-1587-42e2-9636-76b5400a9203',
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
        id: '50f6952c-fa02-498a-9fdc-e5afa19cfed2',
        username: 'John Doe',
        email: 'john@example.com',
        avatar_url: 'https://avatars.githubusercontent.com/u/81815473?v=4',
      },
      {
        id: '8286cf30-0dd5-49ea-b736-8a01ac928a53',
        username: 'Jane Smith',
        email: 'jane@example.com',
        avatar_url: 'https://avatars.githubusercontent.com/u/81815473?v=4',
      },
      {
        id: 'user3',
        username: 'Alex Johnson',
        email: 'alex@example.com',
        avatar_url: 'https://avatars.githubusercontent.com/u/81815473?v=4',
      },
    ])

    // Setup action state listener
  }, [])

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
        />
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={'project_id'}
          value={formData.project_id ?? ''}
        />
        {/* Priority and Status */}
        <PriorityStatusSelections
          priority={formData.priority ?? ''}
          status={formData.status ?? ''}
          updateFormData={(field, value) =>
            updateFormDataFields(field as any, value)
          }
        />
        {/* Assignees Selection - Replace single assignee with multiple assignees */}
        <MultiSelectAssignees
          label="Assignees"
          users={users}
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
          id="start_date"
          label="Start Date"
          date={formData.start_date || null}
          onSelect={(date) => updateFormDataFields('start_date', date)}
        />
        {/* Private Task Checkbox */}
        <PrivateTaskCheckbox
          isPrivate={formData.is_private ?? true}
          onCheckedChange={(checked) => {
            updateFormDataFields('is_private', checked)
            // Reset project_id and assignee_ids when making task private
            if (checked) {
              updateFormDataFields('project_id', null)
              updateFormDataFields('assignee_ids', [])
            }
          }}
        />{' '}
        <input
          type="hidden"
          name="is_private"
          value={formData.is_private ? 'true' : 'false'}
        />
        {/* Hidden input for form submission */}
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
      <div className="flex justify-end">
        <Button
          variant={'main'}
          type="submit"
          disabled={isPending || !formData.title}
          className="w-28 text-white"
        >
          {isPending ? 'Creating...' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}

// Main component
export const OverViewTasksHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [status, createTaskAction, isPending] = useActionState<
    TaskResponse,
    FormData
  >(createTask, {
    status: 'idle',
    message: null,
  })

  const handleSuccess = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={'main'}
                size={'smIcon'}
                disabled={isPending}
                onClick={() => setOpenDialog(true)}
                aria-label="Create new task"
              >
                <Plus className="text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Create new task</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="bg-secondary w-full origin-bottom gap-0 px-3 sm:max-w-3xl">
        <TaskForm
          status={status}
          createTaskAction={createTaskAction}
          isPending={isPending}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
