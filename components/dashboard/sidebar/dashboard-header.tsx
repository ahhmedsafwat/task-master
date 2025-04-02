import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import BreadCrumbs from '@/components/ui/breadcrumb'
import { NavUser } from './nav-user'
import {} from '@/components/ui/button'
import { Search } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

export const DashboardHeader = () => {
  return (
    <div
      className={cn(
        'bg-background sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b px-3 py-2 shadow-sm md:px-8',
      )}
    >
      <BreadCrumbs className="ml-10 md:ml-0" />

      <div className="flex h-full items-center gap-3">
        {/* this isn't going to be the final search bar i'm plannign on making it  */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search..."
            className="bg-accent pl-9 focus-visible:border-none focus-visible:outline-none"
          />
          <Search className="absolute left-1 top-1.5" />
        </div>

        <Separator orientation="vertical" />

        <NavUser />
      </div>
    </div>
  )
}
