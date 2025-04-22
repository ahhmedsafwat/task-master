'use client'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Eye, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OverViewCard } from './overview-card'
import { Button } from '@/components/ui/button'
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from '@/components/ui/tooltip'
import { createTask } from '@/lib/server/tasks-actions'
import { useState, useEffect, useActionState, useMemo } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

import { TaskResponse } from '@/lib/types/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Tables, TablesInsert } from '@/lib/types/database.types'

interface Task {
  id: string
  title: string
  project: string
  dueIn: string
  dueType?: 'soon' | 'normal' | 'overdue'
}

interface ActiveTasksProps {
  tasks?: Task[]
  className?: string
}

export function OverViewTasks({ tasks }: ActiveTasksProps) {
  // Mock data - replace with real data from API
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Web Mockup',
      project: 'Yellow Branding',
      dueIn: 'in 20 hours',
      dueType: 'soon',
    },
    {
      id: '2',
      title: 'Cart Landing Page',
      project: 'Cart UI/UX',
      dueIn: 'in 3 days',
      dueType: 'normal',
    },
    {
      id: '3',
      title: 'POS UI/UX',
      project: 'Resto Dashboard',
      dueIn: 'in 1 week',
      dueType: 'normal',
    },
  ]

  // If tasks provided use them, otherwise use mock data
  // If empty array is provided, show empty state
  const tasksToShow = tasks !== undefined ? tasks : mockTasks

  return (
    <OverViewCard
      bodyChildren={<OverViewTasksBody tasks={tasksToShow} />}
      title="Tasks"
      className="dark:bg-secondary bg-accent"
      headerChildren={<OverViewTasksHeader />}
    />
  )
}

interface createTaskFormData extends TablesInsert<'tasks'> {
  assignee_id: string | undefined
}

const OverViewTasksHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const [formData, setFormData] = useState<createTaskFormData>({
    title: '',
    assignee_id: '',
    markdown_content: '',
    is_private: true,
    project_id: null,
    priority: 'LOW',
    status: 'BACKLOG',
    creator_id: '',
    due_date: new Date().toISOString(),
    start_date: new Date().toISOString(),
  })

  const [searchProjectQuery, setSearchProjectQuery] = useState('')
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [users, setUsers] = useState<
    { id: string; name: string; email: string }[]
  >([])
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
        name: 'John Doe',
        email: 'john@example.com',
      },
      { id: 'user2', name: 'Jane Smith', email: 'jane@example.com' },
      { id: 'user3', name: 'Alex Johnson', email: 'alex@example.com' },
    ])
  }, [])

  // Filter projects based on search query
  const filteredProjects = useMemo(
    () =>
      searchProjectQuery.trim() === ''
        ? projects
        : projects.filter((project) =>
            project.name
              ?.toLowerCase()
              .includes(searchProjectQuery.toLowerCase()),
          ),
    [searchProjectQuery, projects],
  )

  // Filter users based on search query
  const filteredUsers = useMemo(
    () =>
      searchUserQuery.trim() === ''
        ? users
        : users.filter(
            (user) =>
              user.name.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchUserQuery.toLowerCase()),
          ),
    [searchUserQuery, users],
  )

  // Use action state for the createTask server action
  const [createTaskState, createTaskAction, isPending] = useActionState<
    TaskResponse,
    FormData
  >(createTask, {
    status: 'idle',
    message: null,
  })

  const updateFormField = <K extends keyof createTaskFormData>(
    field: K,
    value: createTaskFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      title: '',
      assignee_id: '',
      markdown_content: '',
      is_private: true,
      project_id: null,
      priority: 'LOW',
      status: 'BACKLOG',
      creator_id: '',
      due_date: new Date().toISOString(),
      start_date: new Date().toISOString(),
    })
    setSearchProjectQuery('')
    setSearchUserQuery('')
  }

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
      resetForm()
    }
  }, [createTaskState])

  // If no project is selected, task should be private by default
  useEffect(() => {
    if (!formData.project_id) {
      updateFormField('is_private', true)
    }
  }, [formData.project_id])

  console.log('Form data:', formData)

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
                value={formData.title}
                onChange={(e) => updateFormField('title', e.target.value)}
              />
            </DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Add markDownText..."
            name="markdown_content"
            className="dark:bg-secondary bg-secondary mt-3 h-full max-h-[200px] min-h-[100px] resize-none text-pretty border-none px-2 pb-3 pt-0 shadow-none ring-0 selection:bg-[#373b67] focus:outline-none focus:ring-0 focus-visible:ring-0"
            value={formData.markdown_content ?? ''}
            onChange={(e) =>
              updateFormField('markdown_content', e.target.value)
            }
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Project Selection */}
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <div className="relative">
                <Input
                  placeholder="Search projects..."
                  value={searchProjectQuery}
                  onChange={(e) => setSearchProjectQuery(e.target.value)}
                  className="w-full"
                />
                {searchProjectQuery.length > 0 &&
                  filteredProjects.length > 0 && (
                    <div className="bg-popover absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md shadow-md">
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          className="hover:bg-accent cursor-pointer px-3 py-2"
                          onClick={() => {
                            updateFormField('project_id', project.id || null)
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
              <Select
                name="priority"
                value={formData.priority || 'LOW'}
                onValueChange={(value: 'LOW' | 'MEDIUM' | 'HIGH') =>
                  updateFormField('priority', value)
                }
              >
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
              <Select
                name="status"
                value={formData.status || 'BACKLOG'}
                onValueChange={(
                  value: 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED',
                ) => updateFormField('status', value)}
              >
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
              <Checkbox
                id="is_private"
                name="is_private"
                checked={formData.is_private === true}
                onCheckedChange={(checked) =>
                  updateFormField('is_private', checked === true)
                }
                disabled={!formData.project_id}
              />
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
                            updateFormField('assignee_id', user.id)
                            setSearchUserQuery(user.name)
                            console.log(user.id)
                          }}
                        >
                          <div>{user.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {user.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                      updateFormField('start_date', date?.toISOString() ?? null)
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
                      updateFormField('due_date', date?.toISOString() ?? null)
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
            disabled={isPending || !formData.title}
            className="mt-3 w-28 self-end text-white"
          >
            {isPending ? 'Creating...' : 'Create task'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const OverViewTasksBody = ({ tasks }: ActiveTasksProps) => {
  const tasksToShow = tasks || []
  const isEmpty = tasksToShow.length === 0
  return (
    <>
      <CardContent>
        {isEmpty ? (
          <div className="flex h-48 items-center justify-center">
            <p className="text-muted-foreground text-sm">No items to display</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasksToShow.map((task) => (
              <div
                key={task.id}
                className="dark:bg-primary bg-secondary dark:hover:bg-accent/50 hover:bg-muted relative flex cursor-pointer items-center justify-between rounded-lg border border-dashed p-3 shadow-md transition-colors"
              >
                <Link href={'/dashboard/my-tasks'}>
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {task.project}
                    </p>
                    <span>
                      {task.dueIn && (
                        <div className="mt-2 flex items-center">
                          <div
                            className={cn(
                              'mr-2 h-2 w-2 rounded-full',
                              task.dueType === 'soon'
                                ? 'bg-in-progress'
                                : task.dueType === 'overdue'
                                  ? 'bg-destructive'
                                  : 'bg-success',
                            )}
                          />
                          <span className="text-muted-foreground text-xs">
                            Due {task.dueIn}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                </Link>
                <Button
                  aria-label="View details"
                  variant={'secondary'}
                  size={'smIcon'}
                  onClick={() => {
                    // Handle view details action
                    toast('View task details')
                  }}
                  tabIndex={0}
                  className="hover:text-foreground"
                >
                  <Eye size={18} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="w-full">
        <Button asChild variant={'inverted'} className="w-full text-center">
          <Link href={'/dashboard/my-tasks'}>View all tasks</Link>
        </Button>
      </CardFooter>
    </>
  )
}
