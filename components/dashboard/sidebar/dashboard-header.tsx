import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { userProfile } from '@/lib/types/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserProfileCard } from '../user-profile-card'
import { Settings } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

import { SignOut } from '@/components/auth/signout'

export const DashboardHeader = ({ userData }: { userData: userProfile }) => {
  return (
    <div className={cn('left-0 top-2 z-40 flex w-full px-6 md:px-8')}>
      {/* Right side with search and user profile */}
      <div className="ml-auto flex items-center gap-3">
        {/* Search bar */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-9 focus-visible:border-none focus-visible:outline-none md:w-[240px]"
          />
          <svg
            className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={userData.avatar_url || ''} />
              <AvatarFallback>{userData.username}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel>
              <UserProfileCard
                name={userData.username || userData.email?.split('@')[0]}
                email={userData.email}
                image={userData.avatar_url}
              />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer py-3">
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3">
              <ThemeToggle />
              <span>theme</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
