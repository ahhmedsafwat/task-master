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
import { signOut } from '@/app/auth/actions'
import { UserProfileCard } from './user-profile-card'

interface UserNavProps {
  name: string
  email: string
  image?: string
}

export const NavUser = ({ email, name, image }: UserNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-accent bg-background relative flex cursor-pointer items-center justify-between rounded-lg border py-2 pl-2 pr-2 shadow-lg transition-all">
          <UserProfileCard name={name} email={email} image={image} />
          <ChevronsUpDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <UserProfileCard name={name} email={email} image={image} />
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
