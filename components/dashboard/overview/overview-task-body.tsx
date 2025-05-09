import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
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
export const OverViewTasksBody = ({ tasks }: ActiveTasksProps) => {
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
