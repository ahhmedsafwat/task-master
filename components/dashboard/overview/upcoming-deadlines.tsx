import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface Task {
  id: string
  title: string
  dueIn: number
  priority: 'high' | 'medium' | 'low'
}

interface UpcomingDeadlinesProps {
  tasks: Task[]
  selectedDate: Date
  onDateChange: (date: Date | undefined) => void
}

export function UpcomingDeadlines({
  tasks,
  selectedDate,
  onDateChange,
}: UpcomingDeadlinesProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <Card className="transition-colors hover:border-pink-200">
      <CardHeader>
        <CardTitle className="text-pink-700">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            className="rounded-md border border-pink-100"
          />
          <div className="space-y-4">
            <h3 className="font-semibold text-pink-700">Next 7 Days</h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border border-pink-100 p-2 transition-colors hover:border-pink-200"
                  >
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-muted-foreground text-xs">
                        Due in {task.dueIn} days
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getPriorityColor(task.priority)}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
