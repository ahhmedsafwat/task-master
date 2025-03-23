import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react'
import { ThemeToggle } from '../ui/theme-toggle'
import { signOut } from '@/lib/server/auth-actions'
import { UserProfileCard } from './user-profile-card'
import { userProfile } from '@/lib/types/types'

export const NavUser = (props: { userData: userProfile }) => {
  const { email, username, avatar_url } = props.userData

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-accent bg-background relative flex cursor-pointer items-center justify-between rounded-lg border py-2 pl-2 pr-2 shadow-lg transition-all">
          <UserProfileCard
            name={username || email?.split('@')[0]}
            email={email || ''}
            image={avatar_url}
          />
          <ChevronsUpDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <UserProfileCard
            name={username || email?.split('@')[0]}
            email={email || ''}
            image={avatar_url}
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await signOut()
          }}
        >
          <LogOut className="text-destructive focus:text-destructive" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
