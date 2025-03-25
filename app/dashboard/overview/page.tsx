'use client'
import { StatsCard } from '@/components/dashboard/overview/stats-card'
import { ProjectCard } from '@/components/dashboard/overview/project-card'
import { TeamActivity } from '@/components/dashboard/overview/team-activity'
import { UpcomingDeadlines } from '@/components/dashboard/overview/upcoming-deadlines'
import { BarChart3, CheckCircle2, AlertCircle, CarIcon } from 'lucide-react'
import { useState } from 'react'
import { getDynamicColumnClasses } from '@/lib/utils'

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Mock data - replace with real data from your backend
  const stats = {
    activeProjects: 5,
    overdueProjects: 2,
    completedThisMonth: 12,
    lastMonthCompleted: 8,
    completionRate: 85,
    tasksCompleted: 15,
    projectsContributed: 3,
  }

  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      status: 'online' as const,
      avatar: '/avatars/john.png',
      lastAction: 'Updated Task X in Project Y',
      timestamp: '5m ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      status: 'offline' as const,
      avatar: '/avatars/jane.png',
      lastAction: 'Added to Project Z',
      timestamp: '15m ago',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      status: 'away' as const,
      avatar: '/avatars/mike.png',
      lastAction: 'Completed Task A',
      timestamp: '1h ago',
    },
  ]

  const tasks = [
    { id: '1', title: 'Design Review', dueIn: 1, priority: 'high' as const },
    { id: '2', title: 'Backend API', dueIn: 3, priority: 'medium' as const },
    { id: '3', title: 'Documentation', dueIn: 5, priority: 'low' as const },
  ]

  const projects = [
    {
      id: '1',
      title: 'Website Redesign',
      progress: 75,
      totalTasks: 10,
      completedTasks: 7,
      status: 'in-progress' as const,
    },
    {
      id: '2',
      title: 'Mobile App',
      progress: 30,
      totalTasks: 15,
      completedTasks: 4,
      status: 'overdue' as const,
    },
    {
      id: '3',
      title: 'API Integration',
      progress: 100,
      totalTasks: 8,
      completedTasks: 8,
      status: 'completed' as const,
    },
  ]

  // Array of stats cards - you can modify this as needed
  const statsCards = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      description: `${stats.overdueProjects} overdue`,
      icon: BarChart3,
    },
    {
      title: 'Completed This Month',
      value: stats.completedThisMonth,
      description: 'vs last month',
      icon: CheckCircle2,
      trend: {
        value: stats.completedThisMonth - stats.lastMonthCompleted,
        isPositive: false,
      },
    },
    {
      title: 'assigned tasks',
      value: `${stats.completionRate}`,
      icon: AlertCircle,
    },
    {
      title: 'Tasks Completed',
      value: stats.tasksCompleted,
      description: `across ${stats.projectsContributed} projects`,
      icon: CheckCircle2,
    },

    {
      title: 'Another Stat',
      value: 'Some Value',
      icon: CarIcon,
    },
  ]

  return (
    <div className="container mx-auto space-y-6 p-4">
      {/* Quick Stats */}
      <div className="flex flex-wrap gap-4">
        {statsCards.map((card, index) => (
          <StatsCard
            key={card.title + index}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            trend={card.trend}
          />
        ))}
      </div>
      {/* Main Content Grid */}
      <div>
        {/* Active Projects */}
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <TeamActivity members={teamMembers} />

        {/* Upcoming Deadlines */}
        <UpcomingDeadlines
          tasks={tasks}
          selectedDate={selectedDate}
          onDateChange={(date) => date && setSelectedDate(date)}
        />
      </div>
    </div>
  )
}
