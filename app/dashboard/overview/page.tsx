import { StatsCard } from '@/components/dashboard/overview/overview-stats-card'
import { OverViewTasks } from '@/components/dashboard/overview/overview-tasks'
import { BarChart3, CheckCircle2, AlertCircle, CarIcon } from 'lucide-react'
import { OverViewProjects } from '@/components/dashboard/overview/overview-projects'
import HorizontalSlider from '@/components/ui/horizontal-slider'

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

  // // Projects data
  // const projectTasks = [
  //   {
  //     id: 'p1',
  //     title: 'Yellow Branding',
  //     project: '1 task due soon',
  //     dueIn: '',
  //   },
  //   {
  //     id: 'p2',
  //     title: 'Mogo Web Design',
  //     project: 'no task',
  //     dueIn: '',
  //   },
  //   {
  //     id: 'p3',
  //     title: 'Futurework',
  //     project: '7 task due soon',
  //     dueIn: '',
  //   },
  // ]

  // // People data
  // const peopleData = [
  //   {
  //     id: 'pe1',
  //     title: 'Marc Atenson',
  //     project: 'marcmine@gmail.com',
  //     dueIn: '',
  //   },
  //   {
  //     id: 'pe2',
  //     title: 'Susan Drake',
  //     project: 'contact@susandrake.com',
  //     dueIn: '',
  //   },
  //   {
  //     id: 'pe3',
  //     title: 'Ronald Richards',
  //     project: 'ronaldrichards@gmail.com',
  //     dueIn: '',
  //   },
  // ]

  return (
    <div className="mt-3 flex flex-col gap-6">
      {/* Quick Stats */}
      <HorizontalSlider className="px-4 py-2">
        {statsCards.map((card, index) => (
          <StatsCard
            key={card.title + index}
            title={card.title}
            description={card.description}
            trend={card.trend}
          />
        ))}
      </HorizontalSlider>

      <OverViewTasks />
      <OverViewProjects />
    </div>
  )
}
