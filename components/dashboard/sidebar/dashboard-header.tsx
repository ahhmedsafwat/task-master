import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { userProfile } from '@/lib/types/types'
import BreadCrumbs from '@/components/ui/breadcrumb'
import { NavUser } from './nav-user'

export const DashboardHeader = ({ userData }: { userData: userProfile }) => {
  return (
    <div
      className={cn(
        'bg-background sticky top-0 z-30 flex w-full items-center justify-between border-b px-3 py-2 shadow-sm md:px-8',
      )}
    >
      <BreadCrumbs className="ml-11 md:ml-0" />
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search bar */}
        <div className="relative">
          {/* this isn't going to be the final search bar i'm plannign on making it  */}
          <Input
            type="search"
            placeholder="Search..."
            className="w-0 pl-9 focus-visible:border-none focus-visible:outline-none max-md:invisible md:w-[240px]"
          />
          <svg
            className="text-muted-foreground max-md:bg-accent absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 max-md:box-content max-md:rounded-full max-md:p-1.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* User profile dropdown */}
        <NavUser userData={userData} />
      </div>
    </div>
  )
}
