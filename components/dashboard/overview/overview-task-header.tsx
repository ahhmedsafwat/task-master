import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { createTask } from '@/lib/server/tasks-actions'
import { TaskResponse } from '@/lib/types/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Link, Plus } from 'lucide-react'
import { useState, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { ProjectsSearchDropDown } from '@/components/ui/project-search-dropdown'

// Date picker field component
const DatePickerField = ({
  id,
  label,
  date,
  onSelect,
}: {
  id: string
  label: string
  date: string | null
  onSelect: (date: string | null) => void
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
          aria-label={
            date
              ? `Selected ${label.toLowerCase()}: ${format(new Date(date), 'PPP')}`
              : `Pick a ${label.toLowerCase()}`
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(new Date(date), 'PPP') : `Pick a date`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(selectedDate) => {
            onSelect(
              selectedDate instanceof Date ? selectedDate.toISOString() : null,
            )
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    {/* Hidden input for form submission */}
    <input type="hidden" name={id.toLowerCase()} value={date ?? ''} />
  </div>
)

// Priority and Status selection component
const PriorityStatusSelections = ({
  priority,
  status,
  updateFormData,
}: {
  priority: string | null | undefined
  status: string | null | undefined
  updateFormData: (field: string, value: any) => void
}) => (
  <>
    {/* Priority */}
    <div className="space-y-2">
      <Label htmlFor="priority">Priority</Label>
      <Select
        name="priority"
        value={priority || 'LOW'}
        onValueChange={(value) => {
          updateFormData('priority', value as 'LOW' | 'MEDIUM' | 'HIGH')
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
    <div className="space-y-2">
      <Label htmlFor="status">Status</Label>
      <Select
        name="status"
        value={status || 'BACKLOG'}
        onValueChange={(value) => {
          updateFormData(
            'status',
            value as 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED',
          )
        }}
        aria-label="Select task status"
      >
        <SelectTrigger className="w-full" id="status">
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
      name="is_private"
      checked={!!isPrivate}
      onCheckedChange={(checked) => {
        onCheckedChange(!!checked)
      }}
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
  resetFormData,
}: {
  createTaskAction: any
  isPending: boolean
  onSuccess: () => void
  resetFormData: () => void
}) => {
  const {
    formData,
    filteredProjects,
    searchProjectQuery,
    setSearchProjectQuery,

    updateFormDataFields,
  } = useCreateTaskForm()

  // Handle server action responses
  useEffect(() => {
    if (createTaskAction.status === 'error' && createTaskAction.message) {
      toast.error(createTaskAction.message)
    }

    if (createTaskAction.status === 'created') {
      toast.success(createTaskAction.message, {
        description: (
          <Link
            href={`/dashboard/${createTaskAction.data?.taskId}`}
            className="text-blue-500 underline"
          >
            View task
          </Link>
        ),
      })
      onSuccess()
      resetFormData()
    }

    // Setup action state listener
  }, [createTaskAction, onSuccess, resetFormData])

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
            className="h-12 text-pretty rounded-md border-0 p-2 font-bold shadow-none ring-0 selection:bg-[#373b67] placeholder:text-base focus-visible:ring-0 md:text-lg"
            autoFocus
            required
            value={formData.title || ''}
            onChange={(e) => updateFormDataFields('title', e.target.value)}
          />
        </DialogTitle>
      </DialogHeader>

      {/* Form Fields Grid */}
      <div className="flex flex-col space-y-4">
        {/* Project Selection */}
        <ProjectsSearchDropDown
          projects={filteredProjects as { id: string; name: string }[]}
          label="Project"
          searchQuery={searchProjectQuery}
          setSearchQuery={setSearchProjectQuery}
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
          value={formData.project_id || ''}
        />

        {/* Priority and Status */}
        <PriorityStatusSelections
          priority={formData.priority}
          status={formData.status}
          updateFormData={(field, value) =>
            updateFormDataFields(field as any, value)
          }
        />

        {/* Assignees Selection - Replace single assignee with multiple assignees */}
        {/* <MultiSelectAssignees
          users={users}
          placeholder="search user assign..."
          maxDisplayItems={3}
        /> */}
        {/* Hidden input for form submission - array of assignee IDs */}
        <input
          type="hidden"
          name="assignee_ids"
          value={JSON.stringify(formData.assignee_ids || [])}
        />

        {/* Start Date */}
        <DatePickerField
          id="start_date"
          label="Start Date"
          date={formData.start_date || null}
          onSelect={(date) => updateFormDataFields('start_date', date)}
        />

        {/* Due Date */}
        <DatePickerField
          id="due_date"
          label="Due Date"
          date={formData.due_date || null}
          onSelect={(date) => updateFormDataFields('due_date', date)}
        />

        {/* Private Task Checkbox */}
        <PrivateTaskCheckbox
          isPrivate={formData.is_private || undefined}
          onCheckedChange={(checked) =>
            updateFormDataFields('is_private', checked)
          }
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
  const [, createTaskAction, isPending] = useActionState<
    TaskResponse,
    FormData
  >(createTask, {
    status: 'idle',
    message: null,
  })

  const { resetFormData } = useCreateTaskForm()

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
          createTaskAction={createTaskAction}
          isPending={isPending}
          onSuccess={handleSuccess}
          resetFormData={resetFormData}
        />
      </DialogContent>
    </Dialog>
  )
}
