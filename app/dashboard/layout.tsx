import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar'
import { DashboardHeader } from '@/components/dashboard/sidebar/dashboard-header'
import { getProjects } from '@/lib/server/quieries'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard to mangage your tasks',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const projects = await getProjects()
  if (!projects.data) return null

  return (
    <section className="bg-secondary dark:bg-primary flex max-h-screen overflow-hidden">
      <AppSidebar projects={projects.data} />
      <div className="bg-background relative m-1.5 h-screen flex-1 overflow-y-auto rounded-md border">
        <DashboardHeader />
        <div className="p-4">{children}</div>
      </div>
    </section>
  )
}
