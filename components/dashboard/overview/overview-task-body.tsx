import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Tables } from '@/lib/types/database.types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import Link from 'next/link'

interface ActiveTasksProps {
  tasks: Tables<'tasks'>[]
  className?: string
}
export const OverViewTasksBody = ({ tasks }: ActiveTasksProps) => {
  const tasksToShow = tasks
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

                      {task.due_date ? (
                        <span className="text-muted-foreground text-xs">
                          Due {format(task.due_date, 'dd MMM yyyy')}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          starts{' '}
                          {format(task.start_date || new Date(), 'dd MMM yyyy')}
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
