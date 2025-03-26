import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar'
import { DashboardHeader } from '@/components/dashboard/sidebar/dashboard-header'
import { getProfile, getProjects } from '@/lib/server/quieries'
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
  const [user, projects] = await Promise.all([getProfile(), getProjects()])
  if (!user.data || !projects.data) return null

  return (
    <section className="bg-secondary dark:bg-primary flex max-h-screen overflow-hidden">
      <AppSidebar projects={projects.data} />
      <div className="bg-background m-1.5 h-screen flex-1 overflow-y-scroll rounded-md border pt-4">
        <DashboardHeader userData={user.data} />
        {children}
      </div>
    </section>
  )
}
