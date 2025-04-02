import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { UserProfileCard } from '../user-profile-card'
import { SignOut } from '@/components/auth/signout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getProfile } from '@/lib/server/quieries'

export const NavUser = async () => {
  const { data } = await getProfile()
  if (!data) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={data.avatar_url || ''} />
          <AvatarFallback>{data.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <UserProfileCard
            name={data.username || data.email?.split('@')[0]}
            email={data.email}
            image={data.avatar_url}
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
  )
}
