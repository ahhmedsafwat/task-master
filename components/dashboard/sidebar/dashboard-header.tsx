import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import BreadCrumbs from '@/components/ui/breadcrumb'
import { NavUser } from './nav-user'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const DashboardHeader = () => {
  return (
    <div
      className={cn(
        'bg-background sticky top-0 z-30 flex w-full items-center justify-between border-b px-3 py-2 shadow-sm md:px-8',
      )}
    >
      <BreadCrumbs className="ml-10 md:ml-0" />

      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* this isn't going to be the final search bar i'm plannign on making it  */}
          <Input
            type="search"
            placeholder="Search..."
            className="bg-accent pl-9 focus-visible:border-none focus-visible:outline-none"
          />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'inverted'} className="rounded-full px-2.5">
                <Plus size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <NavUser />
      </div>
    </div>
  )
}
