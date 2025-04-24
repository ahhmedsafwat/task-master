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

export const OverViewTasksHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    filteredProjects,
    filteredUsers,
    formData,
    searchProjectQuery,
    searchUserQuery,
    resetFormData,
    setSearchProjectQuery,
    setSearchUserQuery,
    updateFormDataFields,
  } = useCreateTaskForm()

  // Use action state for the createTask server action
  const [createTaskState, createTaskAction, isPending] = useActionState<
    TaskResponse,
    FormData
  >(createTask, {
    status: 'idle',
    message: null,
  })

  // Handle response from server action
  useEffect(() => {
    if (createTaskState.status === 'error' && createTaskState.message) {
      toast.error(createTaskState.message)
    }

    if (createTaskState.status === 'created') {
      toast.success(createTaskState.message, {
        description: (
          <Link
            href={`/dashboard/${createTaskState.data?.taskId}`}
            className="text-blue-500 underline"
          >
            View task
          </Link>
        ),
      })
      setOpenDialog(false)
      resetFormData()
    }
  }, [createTaskState])

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
              >
                <Plus className="text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Create new task</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="bg-secondary w-full origin-bottom gap-0 px-3 sm:max-w-3xl">
        <form
          className="flex min-h-0 flex-col justify-between overflow-hidden"
          action={createTaskAction}
        >
          <DialogHeader>
            <DialogTitle>
              <Input
                type="text"
                id="task-title"
                name="title"
                placeholder="Task title"
                className="h-12 text-pretty rounded-md border-0 p-2 font-bold shadow-none ring-0 selection:bg-[#373b67] placeholder:text-base focus-visible:ring-0 md:text-lg"
                autoFocus
              />
            </DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Add markDownText..."
            name="markdown_content"
            className="dark:bg-secondary bg-secondary mt-3 h-full max-h-[200px] min-h-[100px] resize-none text-pretty border-none px-2 pb-3 pt-0 shadow-none ring-0 selection:bg-[#373b67] focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Project Selection */}
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <div className="relative">
                <Input placeholder="Search projects..." className="w-full" />
                {searchProjectQuery.length > 0 &&
                  filteredProjects.length > 0 && (
                    <div className="bg-popover absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md shadow-md">
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          className="hover:bg-accent cursor-pointer px-3 py-2"
                          onClick={() => {
                            updateFormDataFields(
                              'project_id',
                              project.id || null,
                            )
                            setSearchProjectQuery(project.name || '')
                          }}
                        >
                          {project.name}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              <input
                type="hidden"
                name="project_id"
                value={formData.project_id || ''}
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority">
                <SelectTrigger className="w-full">
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
              <Select name="status">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BACKLOG">Backlog</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Private Task Checkbox */}
            <div className="mt-6 flex items-center space-x-2">
              <Checkbox id="is_private" name="is_private" />
              <Label htmlFor="is_private" className="cursor-pointer">
                Private task
              </Label>
            </div>

            {/* Assignee Selection - Only enabled if task is not private and has a project */}
            <div className="space-y-2">
              <Label
                htmlFor="assignee"
                className={cn(
                  !formData.project_id || formData.is_private
                    ? 'text-muted-foreground'
                    : '',
                )}
              >
                Assignee
              </Label>
              <div className="relative">
                <Input
                  placeholder="Search users..."
                  value={searchUserQuery}
                  onChange={(e) => setSearchUserQuery(e.target.value)}
                  className="w-full"
                  id="assignee_id"
                  disabled={
                    !formData.project_id || formData.is_private || undefined
                  }
                />
                {searchUserQuery.length > 0 &&
                  filteredUsers.length > 0 &&
                  !formData.is_private &&
                  formData.project_id && (
                    <div className="bg-popover absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md shadow-md">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="hover:bg-accent cursor-pointer px-3 py-2"
                          onClick={() => {
                            updateFormDataFields('assignee_id', user.id)
                            setSearchUserQuery(user.username || '')
                            console.log(user.id)
                          }}
                        >
                          <div>{user.username}</div>
                          <div className="text-muted-foreground text-xs">
                            {user.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                <input
                  type="hidden"
                  name="assignee_id"
                  value={formData.assignee_id || ''}
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formData.start_date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.start_date
                      ? format(formData.start_date, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.start_date
                        ? new Date(formData.start_date)
                        : undefined
                    }
                    onSelect={(date) =>
                      updateFormDataFields(
                        'start_date',
                        date?.toISOString() ?? null,
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="start_date"
                value={formData.start_date ?? ''}
              />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formData.due_date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.due_date
                      ? format(formData.due_date, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.due_date
                        ? new Date(formData.due_date)
                        : undefined
                    }
                    onSelect={(date) =>
                      updateFormDataFields(
                        'due_date',
                        date?.toISOString() ?? null,
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="due_date"
                value={formData.due_date ?? ''}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <Button
            variant={'main'}
            type="submit"
            disabled={isPending}
            className="mt-3 w-28 self-end text-white"
          >
            {isPending ? 'Creating...' : 'Create task'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
