import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { getuser } from '@/lib/server/server-fetching'
import { getProjects } from '@/lib/server/server-fetching'
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
  const user = await getuser()
  const { data: projects } = await getProjects()
  if (!user || !projects) return null

  return (
    <section className="bg-secondary dark:bg-primary flex min-h-screen">
      <AppSidebar userData={user} projects={projects} />
      <div className="bg-background m-1.5 flex-1 rounded-md border">
        {children}
      </div>
    </section>
  )
}
