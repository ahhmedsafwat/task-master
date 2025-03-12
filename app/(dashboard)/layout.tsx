import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard to mangage your tasks',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-primary flex min-h-screen">
      <AppSidebar />
      <div className="bg-background m-1.5 flex-1 rounded-md border">
        {children}
      </div>
    </section>
  )
}
