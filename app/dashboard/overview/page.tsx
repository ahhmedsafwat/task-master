import { StatsCard } from '@/components/dashboard/overview/stats-card'
import { TaskCreationDialog } from '@/components/dashboard/overview/task-creation-dialog'
import { ActiveTasks } from '@/components/dashboard/overview/active-tasks'
import { BarChart3, CheckCircle2, AlertCircle, CarIcon } from 'lucide-react'

export default function Page() {
  // Mock data - replace with real data from your backend
  const stats = {
    activeProjects: 5,
    completedThisMonth: 12,
    lastMonthCompleted: 8,
    completionRate: 85,
    tasksCompleted: 15,
    projectsContributed: 3,
  }

  // Array of stats cards - you can modify this as needed
  const statsCards = [
    {
      title: '8',
      value: stats.activeProjects,
      description: `Active Projects`,
      icon: BarChart3,
      trend: {
        value: stats.activeProjects - stats.completedThisMonth,
        isPositive: false,
      },
    },
    {
      title: '50',
      value: stats.completedThisMonth,
      description: 'completed this month',
      icon: CheckCircle2,
      trend: {
        value: stats.completedThisMonth - stats.lastMonthCompleted,
        isPositive: true,
      },
    },
    {
      title: `${stats.completionRate}`,
      description: `assigned tasks`,
      icon: AlertCircle,
      trend: {
        value: 5,
        isPositive: true,
      },
    },
    {
      title: `${stats.projectsContributed}`,
      value: stats.tasksCompleted,
      description: `Tasks Completed`,
      icon: CheckCircle2,
      trend: {
        value: stats.tasksCompleted - 10,
        isPositive: false,
      },
    },
    {
      title: '8',
      description: 'Overdue Tasks',
      icon: CarIcon,
      trend: {
        value: 2,
        isPositive: false,
      },
    },
  ]

  return (
    <div className="mx-auto space-y-6">
      {/* Quick Stats */}
      <div className="flex flex-wrap gap-4">
        {statsCards.map((card, index) => (
          <StatsCard
            key={card.title + index}
            title={card.title}
            description={card.description}
            trend={card.trend}
          />
        ))}
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-4 gap-6">
        <TaskCreationDialog />
        <ActiveTasks />
      </div>
    </div>
  )
}
