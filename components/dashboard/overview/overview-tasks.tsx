import { CardContent } from '@/components/ui/card'
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

const OverViewTasksHeader = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={'main'} size={'icon'}>
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Create task</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const OverViewTasksBody = ({ tasks }: ActiveTasksProps) => {
  const tasksToShow = tasks || []
  const isEmpty = tasksToShow.length === 0
  return (
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
              className="bg-primary hover:bg-accent/50 relative flex flex-col rounded-lg border border-dashed p-3 shadow-md transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {task.project}
                  </p>
                </div>
                <button
                  aria-label="View details"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={0}
                >
                  <Eye size={18} />
                </button>
              </div>
              <span>
                {task.dueIn && (
                  <div className="mt-2 flex items-center">
                    <div
                      className={cn(
                        'mr-2 h-2 w-2 rounded-full',
                        task.dueType === 'soon'
                          ? 'bg-amber-500'
                          : task.dueType === 'overdue'
                            ? 'bg-red-500'
                            : 'bg-green-500',
                      )}
                    />
                    <span className="text-muted-foreground text-xs">
                      Due {task.dueIn}
                    </span>
                  </div>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  )
}
