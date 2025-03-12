import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ChevronsUpDown, LogOut, Settings } from 'lucide-react'
import { ThemeToggle } from '../ui/theme-toggle'
import { signOut } from '@/app/auth/actions'

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
          <div className="flex items-center justify-start gap-1">
            <Avatar>
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-primary-foreground font-cabinet font-sm font-medium">
                {name}
              </span>
              <span className="text-muted-foreground text-xs">{email}</span>
            </div>
          </div>
          <ChevronsUpDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div className="flex items-center justify-start gap-1">
            <Avatar>
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-primary-foreground font-cabinet font-sm font-medium">
                {name}
              </span>
              <span className="text-muted-foreground text-xs">{email}</span>
            </div>
          </div>
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
