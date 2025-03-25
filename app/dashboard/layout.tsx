import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar'

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
  const user = await getProfile()
  const { data: projects } = await getProjects()
  if (!user.data || !projects) return null

  return (
    <section className="bg-secondary dark:bg-primary flex max-h-screen overflow-hidden">
      <AppSidebar userData={user.data} projects={projects} />
      <div className="bg-background m-1.5 h-screen flex-1 overflow-y-scroll rounded-md border">
        {children}
      </div>
    </section>
  )
}
