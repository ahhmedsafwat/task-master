import { Button } from '@/components/ui/button'
import { Tables } from '@/lib/types/database.types'
import { cn } from '@/lib/utils'
import { Duration, format, intervalToDuration, isAfter } from 'date-fns'
import { Eye } from 'lucide-react'
import Link from 'next/link'

interface ActiveTasksProps {
  tasks: Tables<'tasks'>[]
  className?: string
}

export const OverViewTasksBody = ({ tasks }: ActiveTasksProps) => {
  const tasksToShow = tasks
  const isEmpty = tasksToShow.length === 0

  function getRemainingTime(targetDate: Date) {
    const now = new Date()

    if (isAfter(now, targetDate)) {
      return null
    }

    return intervalToDuration({
      start: now,
      end: targetDate,
    })
  }

  // Format duration in a user-friendly way based on the time remaining
  function formatDuration(duration: Duration | null) {
    if (!duration) return 'overdue'

    const { months, days, hours, minutes } = duration

    if (months && months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`
    }

    if (days && days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'}`
    }

    if (hours && hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
    }

    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }

  return (
    <>
      {isEmpty ? (
        <div className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground text-sm">No items to display</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasksToShow.map((task) => {
            // Calculate remaining time for each task
            const remaining = task.due_date
              ? formatDuration(getRemainingTime(new Date(task.due_date)))
              : null
            return (
              <div
                key={task.id}
                className="dark:bg-primary bg-secondary dark:hover:bg-accent/50 hover:bg-muted relative flex cursor-pointer items-center justify-between rounded-lg border border-dashed p-3 shadow-md transition-colors"
              >
                <Link href={'/dashboard/my-tasks'}>
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {task.project_id}
                    </p>
                    <div className="mt-2 flex items-center">
                      {task.status && (
                        <div
                          className={cn(
                            'mr-2 h-2 w-2 rounded-full',
                            task.status === 'IN_PROGRESS'
                              ? 'bg-in-progress'
                              : task.status === 'BACKLOG'
                                ? 'bg-zinc-500'
                                : 'bg-success',
                          )}
                        />
                      )}
                      {task.start_date && (
                        <span className="text-muted-foreground text-xs">
                          Starts {format(task.start_date, 'dd MMM')}
                        </span>
                      )}
                      {task.due_date && (
                        <span className="text-muted-foreground text-xs">
                          &nbsp; | Due {remaining}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                <Button
                  aria-label="View details"
                  variant={'secondary'}
                  size={'smIcon'}
                  tabIndex={0}
                  className="hover:text-foreground"
                >
                  <Eye size={18} />
                </Button>
              </div>
            )
          })}
        </div>
      )}
      <Button asChild variant={'inverted'} className="mt-5 w-full text-center">
        <Link href={'/dashboard/my-tasks'}>View all tasks</Link>
      </Button>
    </>
  )
}
