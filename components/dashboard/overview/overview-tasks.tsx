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
import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

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
  userprofile?: User | null
}

export function OverViewTasks({ tasks, userprofile }: ActiveTasksProps) {
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
      headerChildren={<OverViewTasksHeader userprofile={userprofile} />}
    />
  )
}

// Method 1: Using direct server action with onClick
const OverViewTasksHeader = ({ userprofile }: ActiveTasksProps) => {
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateTask = async () => {
    if (isCreating) return

    setIsCreating(true)
    try {
      const response = await createTask({
        title: 'New task',
        userProfile: null,
        creator_id: userprofile?.id ?? '',
      })

      if (response.status === 'error') {
        toast.error(response.message || 'Failed to create task')
      }
    } catch {
      toast.error('Failed to create task')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'main'}
            size={'icon'}
            onClick={handleCreateTask}
            disabled={isCreating}
          >
            <Plus className="text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Create new task</TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
                  size={'icon'}
                  onClick={() => {
                    // Handle view details action
                    toast('View task details')
                  }}
                  tabIndex={0}
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
