import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface ProjectCardProps {
  title: string
  progress: number
  totalTasks: number
  completedTasks: number
  status: 'in-progress' | 'completed' | 'overdue'
}

export function ProjectCard({
  title,
  progress,
  totalTasks,
  completedTasks,
  status,
}: ProjectCardProps) {
  const statusColors = {
    'in-progress': 'bg-pink-100 text-pink-800',
    completed: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
  }

  return (
    <Card className="transition-colors hover:border-pink-200">
      <CardContent className="pt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant="outline" className={statusColors[status]}>
            {status.replace('-', ' ').charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 bg-pink-100" />
        <p className="text-muted-foreground mt-2 text-sm">
          {completedTasks}/{totalTasks} tasks completed
        </p>
      </CardContent>
    </Card>
  )
}
