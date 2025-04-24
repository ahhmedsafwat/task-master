'use client'
import { OverViewCard } from './overview-card'
import { OverViewTasksBody } from './overview-task-body'
import { OverViewTasksHeader } from './overview-task-header'

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
      title="Tasks"
      className="dark:bg-secondary bg-accent"
      bodyChildren={<OverViewTasksBody tasks={tasksToShow} />}
      headerChildren={<OverViewTasksHeader />}
    />
  )
}
